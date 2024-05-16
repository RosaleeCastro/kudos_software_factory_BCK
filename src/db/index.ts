import "dotenv/config";
import { Client, Pool } from "pg";


const dbConfig = {
    host: process.env["PGHOST"],
    port: Number(process.env["PGPORT"]),
    database: process.env["PGDATABASE"],
    user: process.env["PGUSER"],
    password: process.env["PGPASSWORD"],
  }


// Todas las consultas 
export const pool = new Pool(dbConfig);

export const query = (text: string, params?: (string | number | boolean)[]) => {
  return pool.query(text, params);
};

//Crear la base de datos y borrar la base de datos
export const adminClient = new Client({
  host: process.env["PGHOST"],
  port: Number(process.env["PGPORT"]),
  database: process.env["PGUSER"], // podría ser "postgres" también
  user: process.env["PGUSER"],
  password: process.env["PGPASSWORD"],
});


// Este archivo maneja la conexion con la base de datos, pero sobre tod es como vamos hacer las consultas atravez de la query, 