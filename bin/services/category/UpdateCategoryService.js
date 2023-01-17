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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCategoryService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class UpdateCategoryService {
    execute({ id, name, expense, includeGoal, priority, updated_by }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (name === '') {
                throw new Error('Name invalid');
            }
            const category = yield prisma_1.default.category.update({
                where: {
                    id: id
                },
                data: {
                    name: name,
                    expense: expense,
                    priority: priority,
                    includeGoal: includeGoal,
                    updated_at: new Date(),
                    updated_by: updated_by,
                },
                select: {
                    id: true,
                    name: true,
                    expense: true,
                    priority: true,
                    includeGoal: true
                }
            });
            return category;
        });
    }
}
exports.UpdateCategoryService = UpdateCategoryService;
