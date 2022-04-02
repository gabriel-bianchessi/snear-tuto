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
const database_1 = __importDefault(require("../database"));
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.get("/", (req, res) => res.send("Hello"));
router.get("/login/:login/:password", (req, res) => {
    const params = req.params;
    if (params['login'] == "gabriel" && params['password'] == "123123") {
        res.json({ error: false });
        return;
    }
    res.statusCode = 403;
    res.json({ error: true });
});
router.get("/pessoa", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield (0, database_1.default)();
    const [rows, fields] = yield connection.execute('SELECT * FROM `pessoa`');
    res.json({ rows });
}));
exports.default = router;
