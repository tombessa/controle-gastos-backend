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
exports.UpdateGoalPeriodController = void 0;
const UpdateGoalPeriodService_1 = require("../../services/goalPeriod/UpdateGoalPeriodService");
class UpdateGoalPeriodController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, amount, category_id, period_id } = req.body;
            const user_id = req.user_id;
            const updated_by = user_id;
            const updateGoalPeriodService = new UpdateGoalPeriodService_1.UpdateGoalPeriodService();
            const goalPeriod = yield updateGoalPeriodService.execute({ id, amount, category_id, period_id, updated_by });
            return res.json(goalPeriod);
        });
    }
    handle2(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { amount, category_id, period } = req.body;
            const user_id = req.user_id;
            const updated_by = user_id;
            const updateGoalPeriodService = new UpdateGoalPeriodService_1.UpdateGoalPeriodService();
            const goalPeriod = yield updateGoalPeriodService.execute2({ amount, category_id, period, updated_by });
            return res.json(goalPeriod);
        });
    }
}
exports.UpdateGoalPeriodController = UpdateGoalPeriodController;
