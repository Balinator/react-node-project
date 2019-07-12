import Koa from "koa";
import cors from "koa-cors";
import serve from "koa-static";
import logger from "koa-logger";
import bodyParser from "koa-bodyparser";

import mount from "koa-mount";

import Router from"koa-router";
import HttpStatus from"http-status";

const app = new Koa();

const router = new Router();

router.get("/api/data", async (ctx, next) => {
    ctx.status = HttpStatus.OK;
    ctx.body = {data:{json:true}};
    await next();
});

const static_pages = new Koa();
static_pages.use(serve(__dirname + "/../client/build")); //serve the build directory
app.use(mount("/", static_pages));
app.use(bodyParser());
app.use(logger());
app.use(cors());

app.use(router.routes()).use(router.allowedMethods());
app.use(function *(){
  this.set('Access-Control-Allow-Origin', '*');
});
  

app.listen(3000);
console.log('Server running in http://localhost:' + (process.env.PORT || 3000))
