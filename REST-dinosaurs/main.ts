import { Application } from "https://deno.land/x/oak/mod.ts";
import * as envConfig from "https://deno.land/x/dotenv/mod.ts";

//set config
envConfig.config({ export: true });

const app = new Application();
const env = Deno.env;

console.log(env.get("SOME_ENV_VAR"));

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

app.use((ctx) => {
  ctx.response.body = {
    message: "Hello from deno!",
  };
});

await app.listen({ port: 3000 });
