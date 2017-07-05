"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Sequelize = require("sequelize");
const config_1 = require("../config");
console.log('init sequelize...');
const sequelize = new Sequelize(config_1.default.database, config_1.default.username, config_1.default.password, {
    host: config_1.default.host,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 30000
    }
});
exports.default = sequelize;
//# sourceMappingURL=sequelize.js.map