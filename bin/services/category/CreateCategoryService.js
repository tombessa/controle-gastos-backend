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
exports.CreateCategoryService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
const ListCategoryService_1 = require("./ListCategoryService");
const UpdateCategoryService_1 = require("./UpdateCategoryService");
class CreateCategoryService {
    execute({ name, expense, priority, includeGoal, created_by, updated_by }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (name === '') {
                throw new Error('Name invalid');
            }
            //Verify if exists
            let listCategory = yield new ListCategoryService_1.ListCategoryService().execute({ name, expense, created_by });
            let category = {};
            if (listCategory.length > 0) {
                //Update it
                const id = listCategory[0].id;
                category = yield new UpdateCategoryService_1.UpdateCategoryService().execute({ id, name, expense, priority, includeGoal, updated_by });
            }
            else {
                category = yield prisma_1.default.category.create({
                    data: {
                        name: name,
                        expense: expense,
                        priority: priority,
                        includeGoal: includeGoal,
                        created_by: created_by,
                        updated_by: updated_by,
                    },
                    select: {
                        id: true,
                        name: true,
                        expense: true,
                        priority: true,
                        includeGoal: true
                    }
                });
            }
            return category;
        });
    }
}
exports.CreateCategoryService = CreateCategoryService;
