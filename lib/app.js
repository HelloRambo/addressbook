"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const jwtKoa = require("koa-jwt");
const secret = 'jwt demo';
const rest_1 = require("./middlreware/rest");
const api_1 = require("./router/api");
const app = new Koa();
// log request URL:
app.use((ctx, next) => __awaiter(this, void 0, void 0, function* () {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    yield next();
}));
app.use(bodyParser());
// bind rest() for ctx
app.use(rest_1.default());
app.use(jwtKoa({ secret }).unless({
    path: [/^\/api\/users/, /^\/api\/token/]
}));
app.use(api_1.default.routes());
exports.default = app;
//# sourceMappingURL=app.js.map