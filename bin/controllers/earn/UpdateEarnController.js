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
exports.UpdateEarnController = void 0;
const UpdateEarnService_1 = require("../../services/earn/UpdateEarnService");
class UpdateEarnController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, date, description, value, category_id, goal_period_id, bank_id, account } = req.body;
            const user_id = req.user_id;
            const created_by = user_id;
            const updated_by = user_id;
            const updateEarnService = new UpdateEarnService_1.UpdateEarnService();
            const earn = yield updateEarnService.execute({ id, date, description, value, category_id, goal_period_id, bank_id, account, created_by, updated_by });
            return res.json(earn);
        });
    }
}
exports.UpdateEarnController = UpdateEarnController;
