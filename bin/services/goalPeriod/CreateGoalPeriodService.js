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
exports.CreateGoalPeriodService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
const ListGoalPeriodService_1 = require("./ListGoalPeriodService");
class CreateGoalPeriodService {
    execute({ amount, created_by, updated_by, category_id, period_id }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (amount === undefined)
                throw new Error('amount invalid');
            //Verify first if exists the Goal Period
            const listGoalPeriodService = new ListGoalPeriodService_1.ListGoalPeriodService();
            const goalPeriodExists = yield listGoalPeriodService.execute({ id: null, amount: null, category_id: category_id, period_id: period_id, amount_compare: null, created_by: created_by });
            if (goalPeriodExists)
                if (goalPeriodExists[0])
                    return goalPeriodExists[0];
            let create = {
                data: {
                    amount: amount,
                    category_id: category_id,
                    period_id: period_id,
                    created_by: created_by,
                    updated_by: updated_by
                },
                select: {
                    id: true,
                    amount: true,
                    period_id: true,
                    category_id: true
                }
            };
            const goalPeriod = yield prisma_1.default.goalPeriod.create(create);
            return goalPeriod;
        });
    }
}
exports.CreateGoalPeriodService = CreateGoalPeriodService;
