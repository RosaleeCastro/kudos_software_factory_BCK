"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const index_1 = require("../index");
const dbName = process.env["PGDATABASE"];
index_1.adminClient.connect();
index_1.adminClient.query(`CREATE DATABASE "${dbName}"`, (err) => {
    if (err) {
        console.error("Error al crear la base de datos", err.stack);
    }
    else {
        console.log(`Base de datos "${dbName}" creada exitosamente`);
    }
    index_1.adminClient.end();
});
