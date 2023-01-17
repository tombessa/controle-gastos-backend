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
exports.DeleteEarnService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class DeleteEarnService {
    execute({ id }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (id === undefined)
                throw new Error('Id invalid');
            const earn = yield prisma_1.default.earn.delete({
                where: {
                    id: id,
                }
            });
            return earn;
        });
    }
}
exports.DeleteEarnService = DeleteEarnService;
