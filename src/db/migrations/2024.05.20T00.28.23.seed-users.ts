import {  UserWithOutId } from "../../models/user";
import { faker } from "@faker-js/faker";
import { Migration } from "../scripts/dbMigrate";




export function generateUser(): UserWithOutId {
  const name = faker.person.fullName();
  const password = faker.internet.password();
  const email = faker.internet.email();
  const role = faker.helpers.arrayElement(["user", "admin"]) as "user" | "admin";
  const age = faker.number.int({ min: 18, max: 85 });

  return {
    name,
    password,
    email,
    role,
    age
}}


export const up: Migration = async (params) => {
    const users: UserWithOutId[] = [];
    for (let i = 0; i < 5; i++) {
      users.push(generateUser());
    }
  
    const values = users
      .map(
        (user) =>
          `('${user.name}', '${user.password}', '${user.email}', '${user.role}', '${user.age}')`
      )
      .join(", ");
    const sqlQuery = `INSERT INTO Users (name, password, email, role, age) VALUES ${values};`;
    console.log(sqlQuery);
    return await params.context.query(sqlQuery);
  };

  export const down: Migration = async (params) => {
    return params.context.query(`DELETE FROM users;`);
  };