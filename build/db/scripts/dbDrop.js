"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const __1 = require("..");
const dbName = process.env["PGDATABASE"];
__1.adminClient.connect();
__1.adminClient.query(`DROP DATABASE IF EXISTS "${dbName}"`, (err) => {
    if (err) {
        console.error("Error al eliminar la base de datos", err.stack);
    }
    else {
        console.log(`Base de datos "${dbName}" eliminada exitosamente`);
    }
    __1.adminClient.end();
});
