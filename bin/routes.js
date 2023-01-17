"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const isAuthenticated_1 = require("./middlewares/isAuthenticated");
const multer_2 = __importDefault(require("./config/multer"));
//Controller
const CreateUserController_1 = require("./controllers/user/CreateUserController");
const AuthUserController_1 = require("./controllers/user/AuthUserController");
const DetailUserController_1 = require("./controllers/user/DetailUserController");
const CreateCategoryController_1 = require("./controllers/category/CreateCategoryController");
const ListCategoryController_1 = require("./controllers/category/ListCategoryController");
const UpdateCategoryController_1 = require("./controllers/category/UpdateCategoryController");
const CreateAccountController_1 = require("./controllers/account/CreateAccountController");
const UpdateAccountController_1 = require("./controllers/account/UpdateAccountController");
const ListAccountController_1 = require("./controllers/account/ListAccountController");
const CreatePeriodController_1 = require("./controllers/period/CreatePeriodController");
const UpdatePeriodController_1 = require("./controllers/period/UpdatePeriodController");
const ListPeriodController_1 = require("./controllers/period/ListPeriodController");
const DeleteUserController_1 = require("./controllers/user/DeleteUserController");
const CreateGoalController_1 = require("./controllers/goal/CreateGoalController");
const UpdateGoalController_1 = require("./controllers/goal/UpdateGoalController");
const ListGoalController_1 = require("./controllers/goal/ListGoalController");
const CreateGoalPeriodController_1 = require("./controllers/goalPeriod/CreateGoalPeriodController");
const ListGoalPeriodController_1 = require("./controllers/goalPeriod/ListGoalPeriodController");
const UpdateGoalPeriodController_1 = require("./controllers/goalPeriod/UpdateGoalPeriodController");
const CreateExpenseController_1 = require("./controllers/expense/CreateExpenseController");
const UpdateExpenseController_1 = require("./controllers/expense/UpdateExpenseController");
const ListExpenseController_1 = require("./controllers/expense/ListExpenseController");
const CreateEarnController_1 = require("./controllers/earn/CreateEarnController");
const UpdateEarnController_1 = require("./controllers/earn/UpdateEarnController");
const ListEarnController_1 = require("./controllers/earn/ListEarnController");
const DeleteExpenseController_1 = require("./controllers/expense/DeleteExpenseController");
const DeleteEarnController_1 = require("./controllers/earn/DeleteEarnController");
const router = (0, express_1.Router)();
exports.router = router;
const upload = (0, multer_1.default)(multer_2.default.upload("./tmp"));
//-- ROTAS USER --
router.post('/users', new CreateUserController_1.CreateUserController().handle);
router.post('/session', new AuthUserController_1.AuthUserController().handle);
router.get('/me', isAuthenticated_1.isAuthenticated, new DetailUserController_1.DetailuserController().handle);
router.delete('/users', isAuthenticated_1.isAuthenticated, new DeleteUserController_1.DeleteUserController().handle);
//-- ROTAS CATEGORY
router.post('/category', isAuthenticated_1.isAuthenticated, new CreateCategoryController_1.CreateCategoryController().handle);
router.patch('/category', isAuthenticated_1.isAuthenticated, new UpdateCategoryController_1.UpdateCategoryController().handle);
router.get('/category', isAuthenticated_1.isAuthenticated, new ListCategoryController_1.ListCategoryController().handle);
router.post('/category/resume', isAuthenticated_1.isAuthenticated, new ListCategoryController_1.ListCategoryController().resume);
//-- ROTAS ACCOUNT
router.post('/account', isAuthenticated_1.isAuthenticated, new CreateAccountController_1.CreateAccountController().handle);
router.patch('/account', isAuthenticated_1.isAuthenticated, new UpdateAccountController_1.UpdateAccountController().handle);
router.get('/account', isAuthenticated_1.isAuthenticated, new ListAccountController_1.ListAccountController().handle);
router.post('/account/resume', isAuthenticated_1.isAuthenticated, new ListAccountController_1.ListAccountController().resume);
//-- ROTAS PERIOD
router.post('/period', isAuthenticated_1.isAuthenticated, new CreatePeriodController_1.CreatePeriodController().handle);
router.patch('/period', isAuthenticated_1.isAuthenticated, new UpdatePeriodController_1.UpdatePeriodController().handle);
router.get('/period', isAuthenticated_1.isAuthenticated, new ListPeriodController_1.ListPeriodController().handle);
//-- ROTAS GOAL
router.post('/goal', isAuthenticated_1.isAuthenticated, new CreateGoalController_1.CreateGoalController().handle);
router.patch('/goal', isAuthenticated_1.isAuthenticated, new UpdateGoalController_1.UpdateGoalController().handle);
router.get('/goal', isAuthenticated_1.isAuthenticated, new ListGoalController_1.ListGoalController().handle);
//-- ROTAS GOAL PERIOD
router.post('/goalPeriod', isAuthenticated_1.isAuthenticated, new CreateGoalPeriodController_1.CreateGoalPeriodController().handle);
router.patch('/goalPeriod', isAuthenticated_1.isAuthenticated, new UpdateGoalPeriodController_1.UpdateGoalPeriodController().handle);
router.get('/goalPeriod', isAuthenticated_1.isAuthenticated, new ListGoalPeriodController_1.ListGoalPeriodController().handle);
//-- ROTAS EXPENSE
router.post('/expense', isAuthenticated_1.isAuthenticated, new CreateExpenseController_1.CreateExpenseController().handle);
router.patch('/expense', isAuthenticated_1.isAuthenticated, new UpdateExpenseController_1.UpdateExpenseController().handle);
router.get('/expense', isAuthenticated_1.isAuthenticated, new ListExpenseController_1.ListExpenseController().handle);
router.patch('/expense/delete', isAuthenticated_1.isAuthenticated, new DeleteExpenseController_1.DeleteExpenseController().handle);
//-- ROTAS EARN
router.post('/earn', isAuthenticated_1.isAuthenticated, new CreateEarnController_1.CreateEarnController().handle);
router.patch('/earn', isAuthenticated_1.isAuthenticated, new UpdateEarnController_1.UpdateEarnController().handle);
router.get('/earn', isAuthenticated_1.isAuthenticated, new ListEarnController_1.ListEarnController().handle);
router.patch('/earn/delete', isAuthenticated_1.isAuthenticated, new DeleteEarnController_1.DeleteEarnController().handle);
