import express from "express"
import authRouter from "./routes/auth-router";
const morgan = require('morgan')

const app = express();
const port = 3000;

// Middleware
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))
app.use(express.json())


//Routers
app.use(authRouter)

app.listen (port, () => {
   console.log(`Listening on port ${port}`) 
})


// Aqui tenemos:
// Creación del servidor puerto 3000
// Usamos el middlewear de json y el middlewear de morgan ....+
// Definimos las rutas de la Api
// finalmente escuchar el puerto y la ruta solicitada