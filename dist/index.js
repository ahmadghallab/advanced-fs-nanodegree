"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("express-async-errors");
const body_parser_1 = require("body-parser");
const routes_1 = __importDefault(require("./routes"));
const error_handlers_1 = __importDefault(require("./middlewares/error-handlers"));
const not_found_error_1 = __importDefault(require("./errors/not-found-error"));
const app = (0, express_1.default)();
app.use((0, body_parser_1.json)());
const port = 3002;
app.use('/api', routes_1.default);
app.all('*', () => {
    throw new not_found_error_1.default();
});
app.use(error_handlers_1.default);
app.listen(port, () => console.log(`Listening on port ${port}!`));
exports.default = app;
