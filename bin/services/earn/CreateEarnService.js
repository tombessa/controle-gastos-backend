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
exports.CreateEarnService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
const ListCategoryService_1 = require("../category/ListCategoryService");
const ListGoalPeriodService_1 = require("../goalPeriod/ListGoalPeriodService");
const ListAccountService_1 = require("../account/ListAccountService");
class CreateEarnService {
    execute({ date, description, value, category_id, goal_period_id, bank_id, account, created_by, updated_by }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (date === undefined)
                throw new Error('Date invalid');
            if ((goal_period_id === undefined) && (category_id)) {
                //Try to get goalPeriodId by Date
                try {
                    const year = Number(date.substring(0, 4));
                    const month = Number(date.substring(5, 7));
                    if ((year) && (month)) {
                        const period = { year: year, month: month, created_by: created_by };
                        const goalPeriodService = new ListGoalPeriodService_1.ListGoalPeriodService();
                        const goalPeriod = yield goalPeriodService.execute({ category_id, period, created_by });
                        if (goalPeriod) {
                            if (goalPeriod.length > 0)
                                goal_period_id = goalPeriod[0].id;
                        }
                    }
                }
                catch (e) {
                    throw new Error('Goal Period invalid');
                }
            }
            if (bank_id === undefined) {
                try {
                    const accountName = account.name;
                    const accountType = account.type;
                    if ((accountName) && (accountType)) {
                        const accountService = new ListAccountService_1.ListAccountService();
                        const accounts = yield accountService.execute({ name: accountName, type: accountType, created_by });
                        if (accounts.length > 0)
                            bank_id = accounts[0].id;
                    }
                }
                catch (e) {
                    throw new Error('Account invalid');
                }
            }
            if ((goal_period_id === undefined))
                throw new Error('Goal Period invalid');
            if (description === undefined)
                throw new Error('Description invalid');
            if (value === undefined)
                throw new Error('Value invalid');
            if (category_id === undefined)
                throw new Error('Category invalid');
            if (bank_id === undefined)
                throw new Error('Account invalid');
            const category = yield new ListCategoryService_1.ListCategoryService().execute({ id: category_id, expense: false, created_by: created_by });
            if (category.length === 0)
                throw new Error('Category is not an Earn');
            const earn = yield prisma_1.default.earn.create({
                data: {
                    date: date,
                    description: description,
                    value: value,
                    category_id: category_id,
                    goal_period_id: goal_period_id,
                    bank_id: bank_id,
                    created_by: created_by,
                    updated_by: updated_by,
                },
                include: {
                    account: true,
                    goalPeriod: true,
                    category: true
                }
            });
            return earn;
        });
    }
}
exports.CreateEarnService = CreateEarnService;
