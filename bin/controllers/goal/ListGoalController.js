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
exports.ListGoalController = void 0;
const ListGoalService_1 = require("../../services/goal/ListGoalService");
class ListGoalController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, amount, category_id, amount_compare } = req.body;
            const user_id = req.user_id;
            const created_by = user_id;
            const listGoalService = new ListGoalService_1.ListGoalService();
            if (amount_compare)
                if ((amount_compare != "=") && (amount_compare != ">=") && (amount_compare != "<=") && (amount_compare != ">") && (amount_compare != "<"))
                    throw new Error("Compare Amount not valid!");
            const goal = yield new ListGoalService_1.ListGoalService().execute({ id, amount, category_id, amount_compare, created_by });
            return res.json(goal);
        });
    }
}
exports.ListGoalController = ListGoalController;
