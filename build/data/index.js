"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertIntoDatabase = exports.getUserById = exports.getUserByEmail = void 0;
const db_1 = require("../db");
async function getUserByEmail(email) {
    return (await (0, db_1.query)("SELECT * FROM users WHERE email = $1", [email])).rows[0];
}
exports.getUserByEmail = getUserByEmail;
async function getUserById(id) {
    return (await (0, db_1.query)("SELECT * FROM users WHERE id = $1", [id])).rows[0];
}
exports.getUserById = getUserById;
const insertIntoDatabase = async (user) => {
  
    const query = 'INSERT INTO users ( name, email, age) VALUES ($1, $2, $3)';
    const values = [user.name, user.email, user.age];
    try {
        await db_1.pool.query(query, values);
    }
    catch (err) {
        console.error('Error inserting into database', err);
    }
};
exports.insertIntoDatabase = insertIntoDatabase;
