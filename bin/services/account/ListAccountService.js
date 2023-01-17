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
exports.ListAccountService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
const ListEarnService_1 = require("../earn/ListEarnService");
const ListExpenseService_1 = require("../expense/ListExpenseService");
class ListAccountService {
    formatDate(dateParam) {
        var mm = dateParam.getMonth() + 1;
        var month = (mm > 9 ? '' : '0') + mm;
        var dd = dateParam.getDate();
        var day = (dd > 9 ? '' : '0') + dd;
        return day + "/" + month + "/" + dateParam.getFullYear();
    }
    lastPeriod(period) {
        if (period.month == 1) {
            return { month: 12, year: period.year - 1 };
        }
        else {
            return { month: period.month - 1, year: period.year };
        }
    }
    resume({ expense, earn, period, created_by }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!expense.account)
                new Error("Account invalid");
            if (!earn.account)
                new Error("Account invalid");
            if (expense.account.name !== earn.account.name)
                new Error("Account inconsistent between Expense and Earn");
            if (expense.account.type !== earn.account.type)
                new Error("Account inconsistent between Expense and Earn");
            let query = {
                where: {},
            };
            let usePeriod = false;
            if (period)
                usePeriod = true;
            query.where = Object.assign(Object.assign({}, query.where), { created_by: created_by });
            query.where = Object.assign(Object.assign({}, query.where), { name: expense.account.name });
            query.where = Object.assign(Object.assign({}, query.where), { type: expense.account.type });
            const accountReturn = yield prisma_1.default.account.findMany(query);
            //Adding the Resume
            let account = earn.account;
            const earns = yield new ListEarnService_1.ListEarnService().list({ period, account, created_by });
            let totalEarns = undefined;
            let totalEarnsLastPeriod = undefined;
            let totalEarnsUntilLastPeriod = yield new ListEarnService_1.ListEarnService().resumUntilPeriod({ period, account, created_by });
            if (usePeriod) {
                totalEarns = yield new ListEarnService_1.ListEarnService().resumByPeriod({ period, account, created_by });
                const paramEarnLast = { period: this.lastPeriod(period), account: account, created_by: created_by };
                totalEarnsLastPeriod = yield new ListEarnService_1.ListEarnService().resumByPeriod(paramEarnLast);
            }
            account = expense.account;
            const expenses = yield new ListExpenseService_1.ListExpenseService().list({ period, account, created_by });
            expenses.forEach(t => t.value = -1 * t.value);
            let totalExpenses = undefined;
            let totalExpensesLastPeriod = undefined;
            let totalExpensesUntilLastPeriod = yield new ListExpenseService_1.ListExpenseService().resumUntilPeriod({ period, account, created_by });
            if (usePeriod) {
                totalExpenses = yield new ListExpenseService_1.ListExpenseService().resumByPeriod({ period, account, created_by });
                const paramExpenseLast = { period: this.lastPeriod(period), account: account, created_by: created_by };
                totalExpensesLastPeriod = yield new ListExpenseService_1.ListExpenseService().resumByPeriod(paramExpenseLast);
            }
            const extrato = [];
            earns.forEach(t => extrato.push(Object.assign(Object.assign({}, t), { dateFormat: this.formatDate(t.date) })));
            expenses.forEach(t => extrato.push(Object.assign(Object.assign({}, t), { dateFormat: this.formatDate(t.date) })));
            extrato.sort((a, b) => (a.date.getDate() > b.date.getDate()) ? 1 : ((b.date.getDate() > a.date.getDate()) ? -1 : 0));
            return { accountReturn, totalEarnsUntilLastPeriod, totalEarnsLastPeriod, totalEarns, totalExpensesUntilLastPeriod, totalExpensesLastPeriod, totalExpenses, extrato };
        });
    }
    execute({ id, type, name, created_by }) {
        return __awaiter(this, void 0, void 0, function* () {
            let query = {
                where: {},
                select: {
                    id: true,
                    name: true,
                    type: true
                }
            };
            query.where = Object.assign(Object.assign({}, query.where), { created_by: created_by });
            if (id)
                query.where = Object.assign(Object.assign({}, query.where), { id: id });
            if (type)
                query.where = Object.assign(Object.assign({}, query.where), { type: type });
            if (name)
                query.where = Object.assign(Object.assign({}, query.where), { name: name });
            const account = yield prisma_1.default.account.findMany(query);
            return account;
        });
    }
}
exports.ListAccountService = ListAccountService;
