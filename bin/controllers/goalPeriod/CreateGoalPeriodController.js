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
exports.CreateGoalPeriodController = void 0;
const CreateGoalPeriodService_1 = require("../../services/goalPeriod/CreateGoalPeriodService");
class CreateGoalPeriodController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { amount, period_id, category_id } = req.body;
            const user_id = req.user_id;
            const created_by = user_id;
            const updated_by = user_id;
            const createGoalPeriodService = new CreateGoalPeriodService_1.CreateGoalPeriodService();
            const goalPeriod = yield createGoalPeriodService.execute({ amount, created_by, updated_by, category_id, period_id });
            return res.json(goalPeriod);
        });
    }
}
exports.CreateGoalPeriodController = CreateGoalPeriodController;
