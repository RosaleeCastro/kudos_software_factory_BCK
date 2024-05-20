"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminClient = exports.query = exports.pool = void 0;
require("dotenv/config");
const pg_1 = require("pg");
const dbConfig = {
    host: process.env["PGHOST"],
    port: Number(process.env["PGPORT"]),
    database: process.env["PGDATABASE"],
    user: process.env["PGUSER"],
    password: process.env["PGPASSWORD"],
};
// Todas las consultas 
exports.pool = new pg_1.Pool(dbConfig);
const query = (text, params) => {
    return exports.pool.query(text, params);
};
exports.query = query;
//Crear la base de datos y borrar la base de datos
exports.adminClient = new pg_1.Client({
    host: process.env["PGHOST"],
    port: Number(process.env["PGPORT"]),
    database: process.env["PGUSER"], // podría ser "postgres" también
    user: process.env["PGUSER"],
    password: process.env["PGPASSWORD"],
});
// Este archivo maneja la conexion con la base de datos, pero sobre tod es como vamos hacer las consultas atravez de la query, 
