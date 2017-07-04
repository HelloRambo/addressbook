const Router = require('koa-router')

const User = require('../controllers/user')

const api = new Router({
  prefix: '/api'
})

api
  .post('/users', User.create_user)
  .post('/token', User.get_token)
 
module.exports =  api
