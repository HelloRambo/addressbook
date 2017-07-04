const Router = require('koa-router')

const User = require('../controllers/user')
const Contact = require('../controllers/contact')

const api = new Router({
  prefix: '/api'
})

api
  .post('/users', User.create_user)
  .post('/token', User.get_token)
  .post('/contacts', Contact.add)
  .del('/contact/:id', Contact.remove)
  .get('/contacts', Contact.list)
 
module.exports =  api
