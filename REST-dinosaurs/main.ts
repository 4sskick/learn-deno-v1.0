import { Application, Router } from "https://deno.land/x/oak/mod.ts";
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
  .get("/", (ctx) => {
    ctx.response.body = {
      message: "Hello from deno!",
    };
  })
  .get("/dino", async (ctx) => {
    const insert1 = await dinos.insertOne({
      username: "Tyrannosaurus Rex",
      image:
        "https://cdn.idntimes.com/content-images/community/2020/04/img-20200418-065739-0255861a9175b0bb2e5f67bd91431d66.jpg",
    });

    ctx.response.body = {
      message: insert1,
    };
  })
  .get("/dinosaurs", async (ctx) => {
    const count: number = await dinos.count({
      username: { $ne: null },
    });

    let mData: DinoSchema = await dinos.find({
      username: { $ne: null },
    });

    ctx.response.body = {
      message: count,
      data: mData,
    };
  })
  .get("/getdino", async (ctx) => {
    const getOne = await dinos.findOne({
      username: "Rex",
    });
    ctx.response.body = {
      message: getOne,
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

//setup DB mongo - begin
const client = new mongoDriver.MongoClient();
// const envDB = env.get("MONGO_DB");

//make sure before, mongo service already started
client.connectWithUri("mongodb://localhost:27017");

//define schema
interface DinoSchema {
  _id: number;
  name: string;
  image: string;
}

//init connection
const db = client.database("dinosaurs");
const dinos = db.collection("dinos");

await app.listen({ port: 3000 });
