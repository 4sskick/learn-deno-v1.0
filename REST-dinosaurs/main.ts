import {
  Application,
  Router,
  RouterContext,
  Status,
  STATUS_TEXT,
} from "https://deno.land/x/oak/mod.ts";
import * as envConfig from "https://deno.land/x/dotenv/mod.ts";
import * as mongoDriver from "https://deno.land/x/mongo@v0.8.0/mod.ts";

//set config
envConfig.config({ export: true });

const app = new Application();
const env = Deno.env;

console.log(env.get("MONGO_DB"));

//define router - begin
const router = new Router();
router
  .post("/dino", async (context: RouterContext) => {
    if (!context.request.hasBody) {
      context.throw(Status.BadRequest, STATUS_TEXT.get(Status.BadRequest));
    }

    let dino: DinoSchema | undefined;
    const body = await context.request.body();

    if (body.type == "json") {
      dino = body.value;
    } else {
      context.throw(
        Status.Forbidden,
        `Make sure to use request with JSON on RAW`,
      );
    }

    if (dino) {
      if (
        dino.name.length == 0 || dino.image.length == 0 ||
        dino.name == null || dino.image == null
      ) {
        context.response.body = {
          message: `field name or image can't be empty`,
          data: dino,
        };
        context.response.status = Status.NotFound;
        context.response.type = body.type;
        return;
      }

      if (typeof dino.name !== "string" || typeof dino.image !== "string") {
        context.response.body = {
          message:
            `False type value on name or image. Make sure to set String on it`,
          data: dino,
        };
        context.response.status = Status.NotFound;
        context.response.type = body.type;
        return;
      }

      //validation same data before insert
      await dinos.findOne({
        username: dino.name,
      }).then((found: DinoSchema) => {
        if (found) {
          console.log(`${JSON.stringify(found)} on\n${JSON.stringify(dino)}`);

          context.response.body = {
            message: `Duplicate value`,
            data: dino,
          };
          context.response.status = Status.BadRequest;
          context.response.type = body.type;
        } else {
          console.log("not found, begin to insert");

          if (dino !== undefined) {
            dinos.insertOne({
              username: dino.name,
              image: dino.image,
            }).then((value /* returning $oid which is _id */) => {
              console.log(
                `${JSON.stringify(value)} on inserting ${JSON.stringify(dino)}`,
              );

              context.response.body = {
                message: `${STATUS_TEXT.get(Status.OK)}`,
                data: dino,
              };
              context.response.status = Status.OK;
              context.response.type = body.type;
            }).catch((err) => {
              context.response.body = {
                message: `${
                  STATUS_TEXT.get(Status.InternalServerError)
                } on inserting data`,
                data: dino,
              };
              context.response.status = Status.InternalServerError;
              context.response.type = body.type;
            });
          }else
          context.throw(Status.InternalServerError, STATUS_TEXT.get(Status.InternalServerError));
        }
      }).catch((err: Error) => {
        console.error(err);

        context.response.body = {
          message: `${STATUS_TEXT.get(Status.InternalServerError)} query data`,
          data: dino,
        };
        context.response.status = Status.InternalServerError;
        context.response.type = body.type;
      });
    } else {
      context.throw(Status.BadRequest, STATUS_TEXT.get(Status.BadRequest));
    }
  })
  .get("/dinosaurs", async (context: RouterContext) => {
    const count: number = await dinos.count({
      username: { $ne: null },
    });

    let mData: DinoSchema = await dinos.find({
      username: { $ne: null },
    });

    context.response.body = {
      message: count,
      data: mData,
    };
  });

//middleware setup
// Logger
app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.headers.get("X-Response-Time");
  console.log(`${ctx.request.method} ${ctx.request.url} - ${rt}`);
});

// Timing
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.response.headers.set("X-Response-Time", `${ms}ms`);
});

app.use(router.routes());
app.use(router.allowedMethods());

//define schema
interface DinoSchema {
  _id: number;
  name: string;
  image: string;
}

//setup DB mongo - begin
const client = new mongoDriver.MongoClient();

//make sure before, mongo service already started
client.connectWithUri("mongodb://localhost:27017");

//init connection
const db = client.database("dinosaurs");
const dinos = db.collection("dinos");

await app.listen({ port: 3000 });
