import UserSchema from './userSchema'

class UserModel {
  static async findUserByName (name) {
    const userInfo = await UserSchema.findOne({
      where: {
        name
      }
    })
    return userInfo
  }

  static async createUser (user) {
    await UserSchema.create({
      name: user.name,
      password: user.password,
      email: user.email
    })
    return true
  }
}

export default UserModel
