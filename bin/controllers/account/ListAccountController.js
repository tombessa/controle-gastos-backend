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
exports.ListAccountController = void 0;
const ListAccountService_1 = require("../../services/account/ListAccountService");
class ListAccountController {
    resume(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { expense, earn, period } = req.body;
            const user_id = req.user_id;
            const created_by = user_id;
            const listAccountService = new ListAccountService_1.ListAccountService();
            const account = yield listAccountService.resume({ expense, earn, period, created_by });
            return res.json(account);
        });
    }
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, type, name } = req.body;
            const user_id = req.user_id;
            const created_by = user_id;
            const listAccountService = new ListAccountService_1.ListAccountService();
            const account = yield listAccountService.execute({ id, type, name, created_by });
            return res.json(account);
        });
    }
}
exports.ListAccountController = ListAccountController;
