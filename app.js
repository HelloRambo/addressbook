const Koa = require('koa')
const app = new Koa()
const bodyParser = require('koa-bodyparser')
const jwtKoa = require('koa-jwt')

const secret = 'jwt demo'

const api = require('./router/api')

app.use(bodyParser())

app.use(jwtKoa({secret}).unless({
    path: [/^\/api\/users/, /^\/api\/token/]
}))

app.use(api.routes())

app.listen(3000)
console.log('Server up and running! On port 3000...')