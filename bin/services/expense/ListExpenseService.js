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
exports.ListExpenseService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
const ListGoalPeriodService_1 = require("../goalPeriod/ListGoalPeriodService");
class ListExpenseService {
    list({ period, account, created_by }) {
        return __awaiter(this, void 0, void 0, function* () {
            let goalPeriodList = [];
            if ((!account.name) && (!account.type))
                new Error("Account invalid");
            const goalPeriodService = new ListGoalPeriodService_1.ListGoalPeriodService();
            if (period) {
                const goalPeriods = yield goalPeriodService.execute({ period, created_by });
                if (goalPeriods.length > 0)
                    goalPeriods.forEach(itemPeriod => goalPeriodList.push(itemPeriod.id));
            }
            else {
                const goalPeriods = yield goalPeriodService.execute({ created_by });
                if (goalPeriods.length > 0)
                    goalPeriods.forEach(itemPeriod => goalPeriodList.push(itemPeriod.id));
            }
            const expense = yield prisma_1.default.expense.findMany({
                where: {
                    goal_period_id: { in: goalPeriodList },
                    account: { name: account.name, type: account.type },
                    created_by: created_by
                },
                orderBy: { date: 'asc' },
                include: {
                    category: true
                }
            });
            return expense;
        });
    }
    resumByPeriod({ period, account, created_by }) {
        return __awaiter(this, void 0, void 0, function* () {
            let goalPeriodList = [];
            if ((!account.name) && (!account.type))
                new Error("Account invalid");
            if (period) {
                const goalPeriodService = new ListGoalPeriodService_1.ListGoalPeriodService();
                const goalPeriods = yield goalPeriodService.execute({ period, created_by });
                if (goalPeriods.length > 0)
                    goalPeriods.forEach(itemPeriod => goalPeriodList.push(itemPeriod.id));
            }
            const expense = yield prisma_1.default.expense.aggregate({
                _sum: {
                    value: true,
                },
                where: {
                    goal_period_id: { in: goalPeriodList },
                    account: { name: account.name, type: account.type },
                    created_by: created_by
                }
            });
            return expense;
        });
    }
    resumUntilPeriod({ period, account, created_by }) {
        return __awaiter(this, void 0, void 0, function* () {
            let goalPeriodList = [];
            if ((!account.name) && (!account.type))
                new Error("Account invalid");
            if (period) {
                const period_compare = "<";
                const goalPeriodService = new ListGoalPeriodService_1.ListGoalPeriodService();
                const goalPeriods = yield goalPeriodService.execute({ period, period_compare, created_by });
                if (goalPeriods.length > 0)
                    goalPeriods.forEach(itemPeriod => goalPeriodList.push(itemPeriod.id));
            }
            const expense = yield prisma_1.default.expense.aggregate({
                _sum: {
                    value: true,
                },
                where: {
                    goal_period_id: { in: goalPeriodList },
                    account: { name: account.name, type: account.type },
                    created_by: created_by
                }
            });
            return expense;
        });
    }
    resume({ period, created_by }) {
        return __awaiter(this, void 0, void 0, function* () {
            let goalPeriodList = [];
            if (period) {
                const goalPeriodService = new ListGoalPeriodService_1.ListGoalPeriodService();
                const goalPeriods = yield goalPeriodService.execute({ period, created_by });
                if (goalPeriods.length > 0)
                    goalPeriods.forEach(itemPeriod => goalPeriodList.push(itemPeriod.id));
            }
            const expense = yield prisma_1.default.expense.groupBy({
                by: ['category_id'],
                _sum: {
                    value: true,
                },
                where: {
                    goal_period_id: { in: goalPeriodList },
                    created_by: created_by
                }
            });
            return expense;
        });
    }
    execute({ id, date, description, value, category_id, goal_period_id, date_compare, date_ini, date_fim, created_by, account }) {
        return __awaiter(this, void 0, void 0, function* () {
            let query = {
                where: {},
                include: {
                    category: true,
                    goalPeriod: true,
                    account: true
                }
            };
            if (account) {
                if (account.id)
                    query.where = Object.assign(Object.assign({}, query.where), { account: Object.assign(Object.assign({}, account), { id: account.id }) });
                if (account.type)
                    query.where = Object.assign(Object.assign({}, query.where), { account: Object.assign(Object.assign({}, account), { type: account.type }) });
                if (account.name)
                    query.where = Object.assign(Object.assign({}, query.where), { account: Object.assign(Object.assign({}, account), { name: account.name }) });
            }
            query.where = Object.assign(Object.assign({}, query.where), { created_by: created_by });
            if (id)
                query.where = Object.assign(Object.assign({}, query.where), { id: id });
            if (description)
                query.where = Object.assign(Object.assign({}, query.where), { description: description });
            if (value)
                query.where = Object.assign(Object.assign({}, query.where), { value: value });
            if (category_id)
                query.where = Object.assign(Object.assign({}, query.where), { category_id: category_id });
            if (goal_period_id)
                query.where = Object.assign(Object.assign({}, query.where), { goal_period_id: goal_period_id });
            //Compare one Date
            if (date_compare) {
                if (date_compare === '=')
                    query.where = Object.assign(Object.assign({}, query.where), { date: date });
                if (date_compare === '>')
                    query.where = Object.assign(Object.assign({}, query.where), { date: { gt: date } });
                if (date_compare === '<')
                    query.where = Object.assign(Object.assign({}, query.where), { date: { lt: date } });
                if (date_compare === '=>')
                    query.where = Object.assign(Object.assign({}, query.where), { date: { gte: date } });
                if (date_compare === '=<')
                    query.where = Object.assign(Object.assign({}, query.where), { date: { lte: date } });
            }
            if ((date_ini) && (date_fim))
                query.where = Object.assign(Object.assign({}, query.where), { date: { gte: date_ini, lte: date_fim } });
            const expense = yield prisma_1.default.expense.findMany(query);
            return expense;
        });
    }
}
exports.ListExpenseService = ListExpenseService;
