import express from "express"
const morgan = require('morgan')

const app = express();
const port = 3000;

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))
app.use(express.json())

app.get('/', (req, res) => {
    console.log(`${req.url} esta es la ruta solicitada`)
    res.send('Hello World!')
})

app.listen (port, () => {
   console.log(`Listening on port ${port}`) 
})