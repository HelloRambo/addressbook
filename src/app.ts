import * as Koa from 'koa'
import * as bodyParser from 'koa-bodyparser'
import * as jwtKoa from 'koa-jwt'

const secret = 'jwt demo'

import rest from './middlreware/rest'
import api from './router/api'

const app = new Koa()

// log request URL:
app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`)
    await next()
});

app.use(bodyParser())

// bind rest() for ctx
app.use(rest())

app.use(jwtKoa({secret}).unless({
    path: [/^\/api\/users/, /^\/api\/token/]
}))

app.use(api.routes())

export default app

