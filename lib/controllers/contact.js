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
const ContactModel = require('../models/contact');
const jwt = require('jsonwebtoken');
const secret = 'jwt demo';
const APIError = require('../middlreware/rest').APIError;
class Contact {
    static add(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = ctx.state.user;
            const newContact = ctx.request.body;
            console.log('newContact', newContact);
            ContactModel.count({}, function (err, num) {
                newContact.id = num + 1;
                newContact.userId = user.id;
                var mongoContact = new ContactModel(newContact);
                mongoContact.save();
            });
            ctx.rest(newContact);
        });
    }
    static remove(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = ctx.state.user;
            const contact = yield ContactModel.findOne({ id: ctx.params.id });
            if (contact) {
                if (contact.userId === user.id) {
                    const deleteContact = yield ContactModel.findByIdAndRemove(contact._id);
                    ctx.rest(contact);
                }
                else {
                    throw new APIError('permission:error', 'this contact is not belong to you.');
                }
            }
            else {
                throw new APIError('contact:not_exist', 'the contact is not exist.');
            }
        });
    }
    static list(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = ctx.state.user;
            let contacts = yield ContactModel.find({ userId: user.id });
            return ctx.response.body = contacts;
        });
    }
}
exports.default = Contact;
//# sourceMappingURL=contact.js.map