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
exports.ListGoalPeriodController = void 0;
const ListGoalPeriodService_1 = require("../../services/goalPeriod/ListGoalPeriodService");
class ListGoalPeriodController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, amount, category_id, period_id, amount_compare, period, category } = req.body;
            const user_id = req.user_id;
            const created_by = user_id;
            const listGoalPeriodService = new ListGoalPeriodService_1.ListGoalPeriodService();
            if (amount_compare)
                if ((amount_compare != "=") && (amount_compare != ">=") && (amount_compare != "<=") && (amount_compare != ">") && (amount_compare != "<"))
                    throw new Error("Compare Amount not valid!");
            const goalPeriod = yield new ListGoalPeriodService_1.ListGoalPeriodService().execute({ id, amount, category_id, period_id, amount_compare, period, category, created_by });
            return res.json(goalPeriod);
        });
    }
}
exports.ListGoalPeriodController = ListGoalPeriodController;
