import UserModel from '../models/userModel'
import * as jwt from 'jsonwebtoken'
import APIError from '../middlreware/error'

import * as bcrypt from 'bcryptjs'

const secret = 'jwt demo'


class User {
    static async createUser(ctx) {
        console.log('run')
        const user = ctx.request.body
        console.log(user)
        if (user.password && user.name) {
            const existUser = await UserModel.findUserByName(user.name)
            if (!existUser) {
                const salt = bcrypt.genSaltSync()
                const hash = bcrypt.hashSync(user.password, salt)
                user.password = hash
                await UserModel.createUser(user)
                const newUser = await UserModel.findUserByName(user.name)
                ctx.rest(newUser)
            } else {
                throw new APIError('user:exist', 'the user is exist')
            }
        } else {
            throw new APIError('params:invalid', 'the username or password cant be null.')
        }
    }

    static async getToken(ctx) {
        const data = ctx.request.body
        const user = await UserModel.findUserByName(data.name)
        if (user) {
            if (bcrypt.compareSync(data.password, user.password)) {
                const userToken = {
                    name: user.name,
                    id: user.id
                }
                const token = jwt.sign(userToken, secret, {expiresIn: '1h'})
                ctx.rest({
                    token: token
                })
            } else {
                throw new APIError("params:invalid", "the username or password is wrong.")
            }
        } else {
            throw new APIError("user:is_not_exist", "the user is not exist.")
        }
    }
}

export default User
