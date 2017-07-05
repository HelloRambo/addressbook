"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function APIError(code, message) {
    this.code = code || 'internal:unknown_error';
    this.message = message || '';
}
exports.default = APIError;
//# sourceMappingURL=error.js.map