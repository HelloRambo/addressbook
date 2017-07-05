import * as Router from 'koa-router'

import User from '../controllers/user'
import Contact from '../controllers/contact'

const api = new Router({
  prefix: '/api'
})

api
  .post('/users', User.createUser)
  .post('/token', User.getToken)
  .post('/contacts', Contact.add)
  .del('/contacts/:id', Contact.remove)
  .get('/contacts', Contact.list)
 
export default api