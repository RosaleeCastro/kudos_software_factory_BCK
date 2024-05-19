import   express, { Request, Response } from "express";
import { authenticateHandler } from "../midlewears/authenticate";
import { authorize } from "../midlewears/authorize";
import multer from "multer";
import fs from "fs";
import path from "path";
import csvParser from "csv-parser";

const uploadRouter = express.Router();
const upload = multer({ dest: 'uploads/' });

// Asegurarse de que la carpeta 'uploads' exista
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
  console.log('Created uploads directory');
} else {
  console.log('Uploads directory already exists');
}

// Extender la interfaz Request para incluir la propiedad 'file'
declare global {
  namespace Express {
    interface Request {
      file?: Express.Multer.File;
    }
  }
}

uploadRouter.post(
  "/",
  authenticateHandler,
  authorize("admin"),upload.single("file"),
  (req:Request, res: Response) => {

    const errors: any[] = [];
    const success : any[] = [];

    if(!req.file) {
      return res.status(400).json({
        ok: false,
        error:'No se subio ningun archivo buuu!!'
      });
    }
    if (req.file.mimetype!== 'text/csv'){
      fs.unlink(req.file.path, (err) => {
        if (err) console.error('Error en el borrado del archivo', err);
      }); 
      return res.status(400).json({
        ok: false,
        error:'El archivo no es un csv'
      })
    }
    fs.createReadStream(req.file.path)
  .pipe(csvParser())
  .on('data', (data) => {
    // Validation of data
    const rowErrors = {
      name: !data.name ? 'El campo "name" no puede estar vacío.' : null,
      email: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email) ? 'El formato del campo "email" es inválido.' : null,
      age: isNaN(data.age) || data.age < 0 ? 'El campo "age" debe ser un número positivo.' : null,
    };
    if (Object.values(rowErrors).some(error => error !== null)) {
          errors.push({
            row: success.length + errors.length + 1,
            details: rowErrors,
          });
    }else {
      success.push({
        id: success.length + errors.length + 1,
        name: data.name,
        email: data.email,
        age: parseInt(data.age, 10)
      });
    }
  })
  .on('end', () => {
    if(req.file){
      fs.unlink(req.file.path, (err) => {
        if (err) console.error('Error en el borrado del archivo', err);
      })
    }
    res.json({
      ok: true,
      data:{
        success,
        errors
      }
    })
  })
  

  return ;
      })
    //res.send("File uploaded successfully");
    
    
export default uploadRouter;
