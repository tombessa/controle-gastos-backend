"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateAccountController = void 0;
const UpdateAccountService_1 = require("../../services/account/UpdateAccountService");
class UpdateAccountController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, name, type } = req.body;
            const user_id = req.user_id;
            const updated_by = user_id;
            const updateAccountService = new UpdateAccountService_1.UpdateAccountService();
            const account = yield updateAccountService.execute({
                id, name, type, updated_by
            });
            return res.json(account);
        });
    }
}
exports.UpdateAccountController = UpdateAccountController;
