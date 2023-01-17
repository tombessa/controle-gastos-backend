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
exports.UpdateGoalService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class UpdateGoalService {
    execute({ id, amount, category_id, updated_by }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!id)
                throw new Error('Id invalid');
            if (amount === undefined)
                throw new Error('Amount invalid');
            if (!category_id)
                throw new Error('Category invalid');
            const goal = yield prisma_1.default.goal.update({
                where: {
                    id: id
                },
                data: {
                    amount: amount,
                    category_id: category_id,
                    updated_at: new Date(),
                    updated_by: updated_by,
                },
                select: {
                    id: true,
                    amount: true,
                    category_id: true
                }
            });
            return goal;
        });
    }
}
exports.UpdateGoalService = UpdateGoalService;
