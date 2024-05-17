import { User } from "../models/user";
import * as userDB from "../data"




export async function getUser(id: number): Promise<User | undefined> {
  return await userDB.getUserById(id);
}