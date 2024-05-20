import { config as configDotenv } from "dotenv";
import { adminClient } from "../index";
import fs from "fs";
import path from "path";


if (process.env["NODE_ENV"] === "test") {
  console.log("Creando base de datos de prueba");
  configDotenv({ path: ".env.test" });
  console.log(process.env["PGDATABASE"])
} else {
  configDotenv();
}
const migrationsFileName =
  process.env["NODE_ENV"] === "test"
    ? "migrations.test.json"
    : "migrations.json";


const dbName = process.env["PGDATABASE"];

adminClient.connect();

adminClient.query(`CREATE DATABASE "${dbName}"`, (err) => {
  if (err) {
    console.error("Error al crear la base de datos", err.stack);
  } else {
    console.log(`Base de datos "${dbName}" creada exitosamente`);
  }
  try {
    fs.unlinkSync(
      path.join(__dirname, "..", "migrations", migrationsFileName)
    );
  } catch {
    console.log(
      "No se pudo eliminar el archivo de migraciones",
      migrationsFileName
    );
  }

  adminClient.end();
});