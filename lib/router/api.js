"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require("koa-router");
const user_1 = require("../controllers/user");
const contact_1 = require("../controllers/contact");
const api = new Router({
    prefix: '/api'
});
api
    .post('/users', user_1.default.createUser)
    .post('/token', user_1.default.getToken)
    .post('/contacts', contact_1.default.add)
    .del('/contacts/:id', contact_1.default.remove)
    .get('/contacts', contact_1.default.list);
exports.default = api;
//# sourceMappingURL=api.js.map