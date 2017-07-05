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
const userSchema_1 = require("./userSchema");
class UserModel {
    static findUserByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const userInfo = yield userSchema_1.default.findOne({
                where: {
                    name
                }
            });
            return userInfo;
        });
    }
    static createUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            yield userSchema_1.default.create({
                name: user.name,
                password: user.password,
                email: user.email
            });
            return true;
        });
    }
}
exports.default = UserModel;
//# sourceMappingURL=userModel.js.map