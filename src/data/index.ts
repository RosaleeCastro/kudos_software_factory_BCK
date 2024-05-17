import { query } from "../db";
import { User } from "../models/user";

export async function getUserByEmail(email: string): Promise<User | undefined> {
    return (await query("SELECT * FROM users WHERE email = $1", [email])).rows[0];
  }
  
  export async function getUserById(id: number): Promise<User | undefined> {
    return (await query("SELECT * FROM users WHERE id = $1", [id])).rows[0];
  }