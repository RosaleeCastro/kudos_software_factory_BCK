"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_router_1 = __importDefault(require("./routes/auth-router"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const errors_1 = __importDefault(require("./midlewears/errors"));
const upload_router_1 = __importDefault(require("./routes/upload-router"));
const morgan = require('morgan');
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
//configDotenv()
const app = (0, express_1.default)();
// Configurar CORS para permitir solicitudes desde el frontend
const corsOptions = {
    origin: process.env["CLIENT_ORIGIN"], // http:localhost:5173
    optionsSuccessStatus: 200,
};
app.use((0, cors_1.default)(corsOptions));
const port = process.env["PORT"] || 3500;
// Middleware
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
//app.use(sessionHandler())
//Routers
app.use(auth_router_1.default);
app.use('/upload', upload_router_1.default);
// manejo de errores centralizado
app.use(errors_1.default);
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
