"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const userModel_1 = require("../models/userModel");
const jwt = require("jsonwebtoken");
const error_1 = require("../middlreware/error");
const bcrypt = require("bcryptjs");
const secret = 'jwt demo';
class User {
    static createUser(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('run');
            const user = ctx.request.body;
            console.log(user);
            if (user.password && user.name) {
                const existUser = yield userModel_1.default.findUserByName(user.name);
                if (!existUser) {
                    const salt = bcrypt.genSaltSync();
                    const hash = bcrypt.hashSync(user.password, salt);
                    user.password = hash;
                    yield userModel_1.default.createUser(user);
                    const newUser = yield userModel_1.default.findUserByName(user.name);
                    ctx.rest(newUser);
                }
                else {
                    throw new error_1.default('user:exist', 'the user is exist');
                }
            }
            else {
                throw new error_1.default('params:invalid', 'the username or password cant be null.');
            }
        });
    }
    static getToken(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = ctx.request.body;
            const user = yield userModel_1.default.findUserByName(data.name);
            if (user) {
                if (bcrypt.compareSync(data.password, user.password)) {
                    const userToken = {
                        name: user.name,
                        id: user.id
                    };
                    const token = jwt.sign(userToken, secret, { expiresIn: '1h' });
                    ctx.rest({
                        token: token
                    });
                }
                else {
                    throw new error_1.default("params:invalid", "the username or password is wrong.");
                }
            }
            else {
                throw new error_1.default("user:is_not_exist", "the user is not exist.");
            }
        });
    }
}
exports.default = User;
//# sourceMappingURL=user.js.map