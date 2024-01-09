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
exports.ListGoalPeriodService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
const ListPeriodService_1 = require("../period/ListPeriodService");
class ListGoalPeriodService {
    generatePeriodFromDate(dateParam, dateLimit, forward) {
        let periodParam = [];
        if (forward) { //para frente
            while (dateParam < dateLimit) {
                dateParam.setMonth(dateParam.getMonth() + 1);
                periodParam.push({ period: { month: dateParam.getMonth() + 1, year: dateParam.getFullYear() } });
            }
        }
        else {
            while (dateParam > dateLimit) {
                dateParam.setMonth(dateParam.getMonth() - 1);
                periodParam.push({ period: { month: dateParam.getMonth() + 1, year: dateParam.getFullYear() } });
            }
        }
        return periodParam;
    }
    execute({ id, amount, category_id, period_id, amount_compare, period, period_compare, category, created_by }) {
        return __awaiter(this, void 0, void 0, function* () {
            let query = {
                where: {},
                include: {
                    category: true,
                    period: true,
                }
            };
            query.where = Object.assign(Object.assign({}, query.where), { created_by: created_by });
            if (id)
                query.where = Object.assign(Object.assign({}, query.where), { id: id });
            if ((amount) && (amount_compare === '='))
                query.where = Object.assign(Object.assign({}, query.where), { amount: amount });
            if ((amount) && (amount_compare === '>='))
                query.where = Object.assign(Object.assign({}, query.where), { amount: { gte: amount } });
            if ((amount) && (amount_compare === '<='))
                query.where = Object.assign(Object.assign({}, query.where), { amount: { lte: amount } });
            if ((amount) && (amount_compare === '>'))
                query.where = Object.assign(Object.assign({}, query.where), { amount: { gt: amount } });
            if ((amount) && (amount_compare === '<'))
                query.where = Object.assign(Object.assign({}, query.where), { amount: { lt: amount } });
            if (period_id)
                query.where = Object.assign(Object.assign({}, query.where), { period_id: period_id });
            if (category_id)
                query.where = Object.assign(Object.assign({}, query.where), { category_id: category_id });
            if (category) {
                if (category.id)
                    query.where = Object.assign(Object.assign({}, query.where), { category: Object.assign(Object.assign({}, category), { id: category.id }) });
                if (category.name)
                    query.where = Object.assign(Object.assign({}, query.where), { category: Object.assign(Object.assign({}, category), { name: category.name }) });
                if (category.expense !== undefined)
                    query.where = Object.assign(Object.assign({}, query.where), { category: Object.assign(Object.assign({}, category), { expense: category.expense }) });
                if (category.includeGoal !== undefined)
                    query.where = Object.assign(Object.assign({}, query.where), { category: Object.assign(Object.assign({}, category), { includeGoal: category.includeGoal }) });
                if (category.priority)
                    query.where = Object.assign(Object.assign({}, query.where), { category: Object.assign(Object.assign({}, category), { priority: category.priority }) });
            }
            let usePeriodCompare = false;
            if (period) {
                if (period_compare)
                    usePeriodCompare = true;
                if (usePeriodCompare) {
                    if ((period_compare === '=') && (period.year) && (period.month))
                        query.where = Object.assign(Object.assign({}, query.where), { period: { year: period.year, month: period.month } });
                    let queryPeriod;
                    let dateParam = new Date(period.year, period.month - 1, 1);
                    if ((period_compare === '<=') || (period_compare === '<')) {
                        let periodListReturn = yield new ListPeriodService_1.ListPeriodService().findFirst({ created_by });
                        let dateLimit = new Date(periodListReturn.year, periodListReturn.month - 1, 1);
                        let periodParam = this.generatePeriodFromDate(dateParam, dateLimit, false);
                        query.where = Object.assign(Object.assign({}, query.where), { OR: periodParam });
                    }
                    else
                        new Error("Period Compare Error. Valid: < or <=");
                }
                else {
                    if (period.id)
                        query.where = Object.assign(Object.assign({}, query.where), { period: Object.assign(Object.assign({}, period), { id: period.id }) });
                    if (period.year)
                        query.where = Object.assign(Object.assign({}, query.where), { period: Object.assign(Object.assign({}, period), { year: period.year }) });
                    if (period.month)
                        query.where = Object.assign(Object.assign({}, query.where), { period: Object.assign(Object.assign({}, period), { month: period.month }) });
                }
            }
            console.log(query);
            const goalPeriod = yield prisma_1.default.goalPeriod.findMany(query);
            return goalPeriod;
        });
    }
}
exports.ListGoalPeriodService = ListGoalPeriodService;
