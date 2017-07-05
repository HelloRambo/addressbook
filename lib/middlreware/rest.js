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
exports.default = () => {
    let pathPrefix = '/api/';
    return (ctx, next) => __awaiter(this, void 0, void 0, function* () {
        if (ctx.request.path.startsWith(pathPrefix)) {
            console.log(`Process API ${ctx.request.method} ${ctx.request.url}...`);
            ctx.rest = (data) => {
                ctx.response.type = 'application/json';
                ctx.response.body = data;
            };
            try {
                yield next();
            }
            catch (e) {
                console.log('Process API error...');
                ctx.response.status = 400;
                ctx.response.type = 'application/json';
                ctx.response.body = {
                    code: e.code || 'internal:unknown_error',
                    message: e.message || ''
                };
            }
        }
        else {
            yield next();
        }
    });
};
//# sourceMappingURL=rest.js.map