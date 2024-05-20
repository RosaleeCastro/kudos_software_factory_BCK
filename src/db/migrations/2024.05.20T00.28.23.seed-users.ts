import {  UserWithoutPassId } from "../../models/user";
import { faker } from "@faker-js/faker";
import { Migration } from "../scripts/dbMigrate";




export function generateUser(): UserWithoutPassId {
  const name = faker.person.fullName();
  const email = faker.internet.email();
  const role = faker.helpers.arrayElement(["user", "admin"]) as "user" | "admin";
  const age = faker.number.int({ min: 18, max: 85 });

  return {
    name,  
    email,
    role,
    age
}}


export const up: Migration = async (params) => {
    const users: UserWithoutPassId[] = [];
    for (let i = 0; i < 5; i++) {
      users.push(generateUser());
    }
  
    const values = users
      .map(
        (user) =>
          `('${user.name}', '${user.email}', '${user.role}', '${user.age}')`
      )
      .join(", ");
    const sqlQuery = `INSERT INTO Users (name, email, role, age) VALUES ${values};`;
    console.log(sqlQuery);
    return await params.context.query(sqlQuery);
  };

  export const down: Migration = async (params) => {
    return params.context.query(`DELETE FROM users;`);
  };