"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const routes_1 = __importDefault(require("./routes/routes"));
const api_routes_1 = __importDefault(require("./routes/api.routes"));
app.use("/", routes_1.default);
app.use("/api", api_routes_1.default);
const port = 4000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
