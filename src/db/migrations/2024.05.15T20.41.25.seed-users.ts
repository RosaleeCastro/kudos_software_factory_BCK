import { Migration } from "../scripts/dbMigrate";
import { faker } from "@faker-js/faker";

export type User = {
    name: string;
    email: string;
    age: number;
    role: string;
};

export function generateUser(): User {
    const name = faker.internet.userName();
    const email = faker.internet.email();
    const age = faker.number.int({ min: 18, max: 100 });
    const role = faker.helpers.arrayElement(["admin", "user"]);
    
    return {
        name,
        email,
        age,
        role,
    };
}

export const up: Migration = async (params) => {
    const users: User[] = [];
    for (let i = 0; i < 100; i++) {
        users.push(generateUser());
    }
    const values = users.map((user) => `($1, $2, $3, $4)`).join(", ");
    const queryParams = users.map(user => [user.name, user.email, user.age, user.role]).flat();

    const sqlQuery = `INSERT INTO users (name, email, age, role) VALUES ${values}`;
    return await params.context.query(sqlQuery, queryParams);
};

export const down: Migration = async (params) => {
    return await params.context.query(`DELETE FROM users;`);
};
