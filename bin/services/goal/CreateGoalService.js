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
exports.CreateGoalService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
const ListGoalService_1 = require("./ListGoalService");
const UpdateGoalService_1 = require("./UpdateGoalService");
class CreateGoalService {
    execute({ amount, created_by, updated_by, category_id }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (amount === undefined)
                throw new Error('amount invalid');
            //Verify first if exists
            const listGoalService = new ListGoalService_1.ListGoalService();
            const goalExists = yield listGoalService.execute({ id: null, amount: null, category_id: category_id, amount_compare: null, created_by: created_by });
            let goal;
            if (goalExists)
                if (goalExists[0]) {
                    const id = goalExists[0].id;
                    goal = yield new UpdateGoalService_1.UpdateGoalService().execute({ id, amount, category_id, updated_by });
                }
                else {
                    let create = {
                        data: {
                            amount: amount,
                            category_id: category_id,
                            created_by: created_by,
                            updated_by: updated_by
                        },
                        select: {
                            id: true,
                            amount: true,
                            category_id: true
                        }
                    };
                    goal = yield prisma_1.default.goal.create(create);
                }
            return goal;
        });
    }
}
exports.CreateGoalService = CreateGoalService;
