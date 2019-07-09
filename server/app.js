import Koa from "koa";
import cors from "koa-cors";
import compress from "koa-compress";
import json from "koa-json";
import serve from "koa-static";
import logger from "koa-logger";
import convert from "koa-convert";
import respond from "koa-respond";
import bodyParser from "koa-bodyparser";
import send from "koa-send";
import path from "path";

import index from "./router/index";

const app = new Koa();

app.use(respond());

app.use(async(ctx, next) => {
    ctx.send = send;
    try {
        ctx.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
        ctx.set("Access-Control-Allow-Origin", "*");
        ctx.set("X-Powered-By", "create-koa-app");
        await next();
    } catch (err) {
        ctx.internalServerError(err);
    }
});

app.use(compress({
    threshold: 2048,
    flush: require("zlib").Z_SYNC_FLUSH
}));

app.use(convert(logger()));

app.use(convert(cors()));

app.use(convert(json()));

app.use(bodyParser());

app.use(convert(serve(path.resolve(__dirname, "static"))));

app.use(index.routes());

app.listen(process.env.PORT || 3000);

console.log(`Server up and running! On port ${process.env.PORT || 3000}!`);
