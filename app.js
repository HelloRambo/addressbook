const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const jwtKoa = require('koa-jwt')
const secret = 'jwt demo'
const rest = require('./middlreware/rest')
const api = require('./router/api')

const app = new Koa()

// log request URL:
app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`)
    await next()
});

app.use(bodyParser())

// bind rest() for ctx
app.use(rest.restify())

app.use(jwtKoa({secret}).unless({
    path: [/^\/api\/users/, /^\/api\/token/]
}))

app.use(api.routes())

app.listen(process.env.PORT || 3000)
console.log('Server up and running! On port 3000...')
