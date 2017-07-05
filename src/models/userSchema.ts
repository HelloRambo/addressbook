import * as Sequelize from 'sequelize'
import sequelize from './sequelize'


const UserSchema = sequelize.define('user', {
    id: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    }
})

UserSchema.sync(); // create table

export default UserSchema
