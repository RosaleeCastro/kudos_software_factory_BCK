import { Migration } from "../scripts/dbMigrate";



export const up: Migration = async (params) => {
    return params.context.query(`CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        password VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL CHECK (email ~* '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'),
        age INTEGER CHECK (age > 0),
        role VARCHAR(10) DEFAULT 'user' CHECK (role IN ('user', 'admin'))
    )`);
};

export const down: Migration = async (params) => {
    return params.context.query(`DROP TABLE users`);
}