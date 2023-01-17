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
exports.UpdateCategoryController = void 0;
const UpdateCategoryService_1 = require("../../services/category/UpdateCategoryService");
class UpdateCategoryController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, name, expense, priority, includeGoal } = req.body;
            const user_id = req.user_id;
            const created_by = user_id;
            const updated_by = user_id;
            const updateCategoryService = new UpdateCategoryService_1.UpdateCategoryService();
            const category = yield updateCategoryService.execute({
                id, name, expense, includeGoal, priority, updated_by
            });
            return res.json(category);
        });
    }
}
exports.UpdateCategoryController = UpdateCategoryController;
