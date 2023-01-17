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
exports.ListCategoryController = void 0;
const ListCategoryService_1 = require("../../services/category/ListCategoryService");
class ListCategoryController {
    resume(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, name, expense, includeGoal, priority, period } = req.body;
            const user_id = req.user_id;
            const created_by = user_id;
            const category = yield new ListCategoryService_1.ListCategoryService().resume({ id, name, expense, includeGoal, priority, period, created_by });
            return res.json(category);
        });
    }
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, name, expense, includeGoal, priority } = req.body;
            const user_id = req.user_id;
            const created_by = user_id;
            const category = yield new ListCategoryService_1.ListCategoryService().execute({ id, name, expense, includeGoal, priority, created_by });
            return res.json(category);
        });
    }
}
exports.ListCategoryController = ListCategoryController;
