"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./app/routes"));
const path_1 = __importDefault(require("path"));
const notFoundHandler_1 = __importDefault(require("./app/utils/notFoundHandler"));
const errorHandler_1 = __importDefault(require("./app/utils/errorHandler"));
const app = (0, express_1.default)();
//parsers
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// Serve static files
const staticPath = path_1.default.join(__dirname, "../uploads");
app.use("./app/uploads", express_1.default.static(staticPath));
// route
app.get('/', (req, res) => {
    res.send("Hello world");
});
// route handel 
app.use('/api/v1', routes_1.default);
app.use(notFoundHandler_1.default);
app.use(errorHandler_1.default);
exports.default = app;
