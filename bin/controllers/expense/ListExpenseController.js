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
exports.ListExpenseController = void 0;
const ListExpenseService_1 = require("../../services/expense/ListExpenseService");
class ListExpenseController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, date, description, value, category_id, goal_period_id, date_compare, date_ini, date_fim, account } = req.body;
            const user_id = req.user_id;
            const created_by = user_id;
            const listExpenseService = new ListExpenseService_1.ListExpenseService();
            if (date_compare)
                if ((date_compare != "=") && (date_compare != ">=") && (date_compare != "<=") && (date_compare != ">") && (date_compare != "<"))
                    throw new Error("Compare Date not valid!");
            const expense = yield new ListExpenseService_1.ListExpenseService().execute({ id, date, description, value, category_id, goal_period_id, date_compare, date_ini, date_fim, created_by, account });
            return res.json(expense);
        });
    }
}
exports.ListExpenseController = ListExpenseController;
