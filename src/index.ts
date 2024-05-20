import express from "express"
import authRouter from "./routes/auth-router";
import cookieParser from "cookie-parser";
import errorHandler from "./midlewears/errors";
import uploadRouter from "./routes/upload-router";
const morgan = require('morgan')
import cors from 'cors'
import dotenv from 'dotenv';

dotenv.config();
//configDotenv()

const app = express();
// Configurar CORS para permitir solicitudes desde el frontend
const corsOptions = {
   origin: process.env["CLIENT_ORIGIN"], // http:localhost:5173
   optionsSuccessStatus: 200,
 };
 app.use(cors(corsOptions));

const port = process.env["PORT"] ||3500;

// Middleware
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))
app.use(cookieParser())
app.use(express.json())
//app.use(sessionHandler())


//Routers
app.use(authRouter)
app.use('/upload', uploadRouter)


// manejo de errores centralizado
app.use(errorHandler)

app.listen (port, () => {
   console.log(`Listening on port ${port}`) 
})


