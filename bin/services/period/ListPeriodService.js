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
exports.ListPeriodService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class ListPeriodService {
    findFirst({ id, month, year, created_by }) {
        return __awaiter(this, void 0, void 0, function* () {
            let query = {
                where: {},
                select: {
                    id: true,
                    month: true,
                    year: true
                }
            };
            query.where = Object.assign(Object.assign({}, query.where), { created_by: created_by });
            const period = yield prisma_1.default.period.findFirst(query);
            return period;
        });
    }
    execute({ id, month, year, created_by }) {
        return __awaiter(this, void 0, void 0, function* () {
            let query = {
                where: {},
                select: {
                    id: true,
                    month: true,
                    year: true
                }
            };
            query.where = Object.assign(Object.assign({}, query.where), { created_by: created_by });
            if (id)
                query.where = Object.assign(Object.assign({}, query.where), { id: id });
            if (month)
                query.where = Object.assign(Object.assign({}, query.where), { month: month });
            if (year)
                query.where = Object.assign(Object.assign({}, query.where), { year: year });
            const period = yield prisma_1.default.period.findMany(query);
            return period;
        });
    }
}
exports.ListPeriodService = ListPeriodService;
