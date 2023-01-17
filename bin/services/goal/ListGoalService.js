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
exports.ListGoalService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class ListGoalService {
    execute({ id, amount, category_id, amount_compare, created_by }) {
        return __awaiter(this, void 0, void 0, function* () {
            let query = {
                where: {},
                include: {
                    category: true
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
            if (category_id)
                query.where = Object.assign(Object.assign({}, query.where), { category_id: category_id });
            const goal = yield prisma_1.default.goal.findMany(query);
            return goal;
        });
    }
}
exports.ListGoalService = ListGoalService;
