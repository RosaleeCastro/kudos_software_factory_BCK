"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
const up = async (params) => {
    return params.context.query(`CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL CHECK (email ~* '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'),
        age INTEGER CHECK (age > 0),
        role VARCHAR(10) DEFAULT 'user' CHECK (role IN ('user', 'admin'))
    )`);
};
exports.up = up;
const down = async (params) => {
    return params.context.query(`DROP TABLE users`);
};
exports.down = down;
