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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteEarnController = void 0;
const DeleteEarnService_1 = require("../../services/earn/DeleteEarnService");
class DeleteEarnController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.body;
            const user_id = req.user_id;
            const created_by = user_id;
            const updated_by = user_id;
            const Earn = yield new DeleteEarnService_1.DeleteEarnService().execute({ id });
            return res.json(Earn);
        });
    }
}
exports.DeleteEarnController = DeleteEarnController;
