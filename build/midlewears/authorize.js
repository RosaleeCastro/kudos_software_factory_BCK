"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = void 0;
const errors_1 = require("./errors");
function authorize(...allowedRoles) {
    return async (req, _res, next) => {
        const role = req.userRole;
        if (!role)
            return next(new errors_1.ApiError("No autorizado", 401));
        if (allowedRoles.includes(role)) {
            next();
        }
        else {
            next(new errors_1.ApiError("Acceso denengado", 403));
        }
    };
}
exports.authorize = authorize;
