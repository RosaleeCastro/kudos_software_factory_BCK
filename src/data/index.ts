import { pool, query } from "../db";
import { User, UserWithoutIdPsw } from "../models/user";

export async function getUserByEmail(email: string): Promise<User | undefined> {
    return (await query("SELECT * FROM users WHERE email = $1", [email])).rows[0];
  }
  
  export async function getUserById(id: number): Promise<User | undefined> {
    return (await query("SELECT * FROM users WHERE id = $1", [id])).rows[0];
  }

  export const insertIntoDatabase = async (user: UserWithoutIdPsw) => {
    console.log(user)
    const query = 'INSERT INTO users ( name, email, age) VALUES ($1, $2, $3)';
    const values = [ user.name, user.email, user.age];
  
    try {
      await pool.query(query, values);
    } catch (err) {
      console.error('Error inserting into database', err);
    }
  };