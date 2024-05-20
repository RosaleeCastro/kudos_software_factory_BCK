import { configDotenv } from "dotenv";
import { query, pool } from "..";

if (process.env["NODE_ENV"] === "test") {
  configDotenv({ path: ".env.test" });
} else {
  configDotenv();
}

query(`INSERT INTO users (name, pasword, email, age, role) 
  SELECT
      'user ' || s.id, -- Genera un nombre de usuario concatenando una cadena con el ID
      'password' || s.id, -- Genera una contraseña de usuario concatenando una cadena con el ID
      'user' || s.id || '@example.com', -- Genera un correo de usuario concatenando una cadena con el ID
      s.id % 50 + 18, -- Genera una edad aleatoria entre 18 y 67 (50 + 18)
      ROUND((RANDOM() * 1000)) * 100, -- Genera un precio aleatorio entre 0 y 10000
      CASE 
          WHEN s.id % 5 = 0 THEN 'admin'
          ELSE 'user'
      END -- Asigna categorías de manera aleatoria
  FROM generate_series(1, 40) AS s(id);
  `).then(() => {
  console.log("inserando usuarios exitosamente");
  pool.end();
});
