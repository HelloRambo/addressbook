const Router = require('koa-router')

const User = require('../controllers/user')
const Contact = require('../controllers/contact')

const api = new Router({
  prefix: '/api'
})

api
  .post('/users', User.createUser)
  .post('/token', User.getToken)
  .post('/contacts', Contact.add)
  .del('/contacts/:id', Contact.remove)
  .get('/contacts', Contact.list)
 
module.exports =  api
