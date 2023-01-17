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
exports.UpdateGoalPeriodService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class UpdateGoalPeriodService {
    execute({ id, amount, category_id, period_id, updated_by }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!id)
                throw new Error('Id invalid');
            if (amount === undefined)
                throw new Error('Amount invalid');
            if (!period_id)
                throw new Error('Period invalid');
            if (!category_id)
                throw new Error('Period invalid');
            const goalPeriod = yield prisma_1.default.goalPeriod.update({
                where: {
                    id: id
                },
                data: {
                    amount: amount,
                    period_id: period_id,
                    category_id: category_id,
                    updated_at: new Date(),
                    updated_by: updated_by,
                },
                select: {
                    id: true,
                    amount: true,
                    period_id: true,
                    category_id: true
                }
            });
            return goalPeriod;
        });
    }
}
exports.UpdateGoalPeriodService = UpdateGoalPeriodService;
