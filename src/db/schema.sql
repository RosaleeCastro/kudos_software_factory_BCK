CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL CHECK (email ~* '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'),
    age INTEGER CHECK (age > 0),
    role VARCHAR(10) DEFAULT 'user' CHECK (role IN ('user', 'admin'))
);
INSERT INTO users (name, email, age, role) 
VALUES 
  ('rubencito', 'rubel@mial.com', 40, 'admin'),
  ('maruja', 'maru@mial.com', 45, 'admin'),
  ('fulanito', 'fulanito@mial.com', 30, 'user'),
  ('menganito', 'menganito@mial.com', 35, 'user'),
  ('pepito', 'pepito@mial.com', 50, 'admin');

/* esta creación de tabla viene de la documentación de express-session me sirve para llevar el registro de las sesiones */
CREATE TABLE "session" (
  "sid" varchar NOT NULL COLLATE "default",
  "sess" json NOT NULL,
  "expire" timestamp(6) NOT NULL
)
WITH (OIDS=FALSE);
 
ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;
 
CREATE INDEX "IDX_session_expire" ON "session" ("expire");


/* insertar nueva tabla */
ALTER TABLE users
ADD COLUMN password_hash VARCHAR(255);


UPDATE users
SET password_hash = '[COLOCAR AQUI TU HASH DE LA CONTRASEÑA DE PRUEBA]'
WHERE id = [ID DEL USUARIO];

