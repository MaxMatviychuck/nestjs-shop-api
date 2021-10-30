"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthMiddleware = void 0;
const common_1 = require("@nestjs/common");
const type_1 = require("../../type");
const jsonwebtoken_1 = require("jsonwebtoken");
const config_1 = require("../config");
const user_service_1 = require("../user.service");
let AuthMiddleware = class AuthMiddleware {
    constructor(userService) {
        this.userService = userService;
    }
    async use(req, res, next) {
        if (!req.headers.authorization) {
            req.user = null;
            next();
            return;
        }
        const token = req.headers.authorization.split(' ')[1];
        try {
            const decode = (0, jsonwebtoken_1.verify)(token, config_1.JWT_SECRET);
            const user = await this.userService.findById(decode.id);
            req.user = user;
            next();
        }
        catch (e) {
            req.user = null;
            next();
        }
    }
};
AuthMiddleware = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService])
], AuthMiddleware);
exports.AuthMiddleware = AuthMiddleware;
//# sourceMappingURL=auth.middleware.js.map