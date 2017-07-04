const UserModel = require('../models/user');
const jwt = require('jsonwebtoken')


const md5 = require('md5');
const secret = 'jwt demo'


class User {
    static async create_user(ctx) {
        const {name, password, email} = ctx.request.body;
        console.log(ctx.request.body);
        if (!name || !password) {
            const result = {
                code: 400,
                message: 'The username or password can`t be null.',
                data: ''
            }
            return ctx.response.body = result;
        } 
        var user = await UserModel.create({
          name: name,
          password: md5(password),
          email: email
        });
        console.log('created: ' + JSON.stringify(user));
        return ctx.response.body = user
    };

    static async get_token(ctx) {
        const {email, password} =  ctx.request.body;
        console.log('emal', email, password)
        var user = await UserModel.findOne({
            where: {
                email: email
            }
        });
        console.log('user', user)
        console.log('username', user.name)
        if (!user) {
            const result = {
                message: 'The email is wrong.',
                data: ''
            }
            return ctx.response.body = result
        }

        const password_md5 = md5(password);
        if (password_md5 !== user.password) {
            const result = {
                message: 'The password is wrong.',
                data: ''
            }
            return ctx.response.body = result
        }

        var userToken = {
            name: user.name
        }

        const token = jwt.sign(userToken, secret, {expiresIn: '1h'})
        const result = {
            token: token,
            message: 'Successed login.'
        }
        console.log('result', result)
        return ctx.response.body = result
    };

    static async get_user_info(ctx) {
        const token = ctx.header.authorization
        let payload
        if (token) {
            payload = await jwt.verify(token.split(' ')[1], secret)
            console.log('payload', payload)
        }
    }
}

module.exports =  User;