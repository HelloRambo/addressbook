import * as Sequelize from 'sequelize'

import config from '../config'

console.log('init sequelize...');

const sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 30000
    }
});

export default sequelize
