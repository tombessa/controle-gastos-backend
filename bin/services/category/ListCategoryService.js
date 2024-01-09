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
exports.ListCategoryService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
const ListEarnService_1 = require("../earn/ListEarnService");
const ListExpenseService_1 = require("../expense/ListExpenseService");
const ListGoalPeriodService_1 = require("../goalPeriod/ListGoalPeriodService");
class ListCategoryService {
    resume({ id, name, expense, includeGoal, priority, period, created_by }) {
        return __awaiter(this, void 0, void 0, function* () {
            let query = {
                where: {},
                include: {
                    priority: true,
                    goalPeriods: true
                },
                orderBy: { priority: 'asc' }
            };
            query.where = Object.assign(Object.assign({}, query.where), { created_by: created_by });
            if (id !== undefined)
                query.where = Object.assign(Object.assign({}, query.where), { id: id });
            if (name !== undefined)
                query.where = Object.assign(Object.assign({}, query.where), { name: name });
            if (expense !== undefined)
                query.where = Object.assign(Object.assign({}, query.where), { expense: expense });
            if (includeGoal !== undefined)
                query.where = Object.assign(Object.assign({}, query.where), { includeGoal: includeGoal });
            if (priority !== undefined)
                query.where = Object.assign(Object.assign({}, query.where), { priority: priority });
            if (!period)
                throw new Error('Period invalid');
            /*Filter Period*/
            let period_id_filtered;
            if ((period.month) && (period.year)) {
                let category, goalPeriodList;
                if (name)
                    category = Object.assign(Object.assign({}, category), { name, created_by });
                goalPeriodList = yield new ListGoalPeriodService_1.ListGoalPeriodService().execute({ period, category, created_by });
                if (goalPeriodList.length === 0)
                    throw new Error('Period invalid');
                period_id_filtered = goalPeriodList[0].period_id;
            }
            else
                throw new Error('Period invalid');
            /*Summarize*/
            let periodSum = [];
            const periodSumExpense = yield new ListExpenseService_1.ListExpenseService().resume({ period, created_by });
            const periodSumEarn = yield new ListEarnService_1.ListEarnService().resume({ period, created_by });
            periodSumExpense.forEach(item => periodSum.push(item));
            periodSumEarn.forEach(item => periodSum.push(item));
            const categorySearch = yield prisma_1.default.category.findMany(query);
            let categoryReturn = [];
            categorySearch.forEach(item => {
                item.goalPeriods = item.goalPeriods.filter(t => t.period_id === period_id_filtered);
                let periodSumList = periodSum.filter(sum => sum.category_id === item.id);
                let periodSumItem = { amount: 0, total: 0 };
                if (periodSumList)
                    if (periodSumList.length > 0)
                        periodSumItem = Object.assign(Object.assign({}, periodSumItem), { amount: periodSumList[0]._sum.value });
                if (item.goalPeriods)
                    if (item.goalPeriods.length > 0)
                        periodSumItem = Object.assign(Object.assign({}, periodSumItem), { total: item.goalPeriods[0].amount });
                categoryReturn.push(Object.assign(Object.assign({}, item), { periodSumItem }));
            });
            return categoryReturn;
        });
    }
    execute({ id, name, expense, includeGoal, priority, created_by }) {
        return __awaiter(this, void 0, void 0, function* () {
            let query = {
                where: {},
                orderBy: { priority: 'asc' },
                include: {
                    id: true,
                    name: true,
                    expense: true,
                    priority: true,
                    includeGoal: true
                },
            };
            query.where = Object.assign(Object.assign({}, query.where), { created_by: created_by });
            if (id !== undefined)
                query.where = Object.assign(Object.assign({}, query.where), { id: id });
            if (name !== undefined)
                query.where = Object.assign(Object.assign({}, query.where), { name: name });
            if (expense !== undefined)
                query.where = Object.assign(Object.assign({}, query.where), { expense: expense });
            if (includeGoal !== undefined)
                query.where = Object.assign(Object.assign({}, query.where), { includeGoal: includeGoal });
            if (priority !== undefined)
                query.where = Object.assign(Object.assign({}, query.where), { priority: priority });
            const category = yield prisma_1.default.category.findMany(query);
            return category;
        });
    }
}
exports.ListCategoryService = ListCategoryService;
