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
exports.CreatePeriodService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
const ListGoalService_1 = require("../goal/ListGoalService");
const CreateGoalPeriodService_1 = require("../goalPeriod/CreateGoalPeriodService");
const ListPeriodService_1 = require("./ListPeriodService");
class CreatePeriodService {
    execute({ month, year, created_by, updated_by }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!month)
                throw new Error('Month invalid');
            if (!year)
                throw new Error('Year invalid');
            //Verify if exists
            const periodExists = yield new ListPeriodService_1.ListPeriodService().execute({ month, year, created_by });
            let period;
            if (periodExists.length === 0) {
                period = yield prisma_1.default.period.create({
                    data: {
                        month: month,
                        year: year,
                        created_by: created_by,
                        updated_by: updated_by,
                    },
                    select: {
                        id: true,
                        month: true,
                        year: true
                    }
                });
                //Quando se cria um período, automaticamente, cria-se seus objetivos
                const listGoal = new ListGoalService_1.ListGoalService();
                const goals = yield listGoal.execute({ created_by });
                goals.forEach(goal => {
                    const createGoalPeriod = new CreateGoalPeriodService_1.CreateGoalPeriodService();
                    const category_id = goal.category_id;
                    const period_id = period.id;
                    const amount = goal.amount;
                    createGoalPeriod.execute({ amount, category_id, period_id, created_by, updated_by });
                });
            }
            else
                period = periodExists[0];
            return period;
        });
    }
}
exports.CreatePeriodService = CreatePeriodService;
