"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_router_1 = __importDefault(require("./routes/auth-router"));
const morgan = require('morgan');
const app = (0, express_1.default)();
const port = 3000;
// Middleware
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
app.use(express_1.default.json());
//Routers
app.use(auth_router_1.default);
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
// Aqui tenemos:
// Creación del servidor puerto 3000
// Usamos el middlewear de json y el middlewear de morgan ....+
// Definimos las rutas de la Api
// finalmente escuchar el puerto y la ruta solicitada
