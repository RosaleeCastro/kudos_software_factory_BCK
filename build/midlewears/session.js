"use strict";
/*import connectPgSimple from "connect-pg-simple";
import session from "express-session";
import { pool } from "../db";

declare module "express-session" {
  interface SessionData {
    userId: number;
  }
}

export default function sessionHandler() {
  const pgSession = connectPgSimple(session);
  return session({
    store: new pgSession({ pool: pool }),
    secret: "session-secret",
    resave: false,
    saveUninitialized: true,
    cookie: { httpOnly: true },
  });
}
*/
Object.defineProperty(exports, "__esModule", { value: true });
// codigo extraido de la documentacion de express-session, se recomienda usar la libreria de coneccion pg-simple
