import   express, { Request, Response } from "express";
import { authenticateHandler } from "../midlewears/authenticate";
import { authorize } from "../midlewears/authorize";
import multer from "multer";
import fs from "fs";
import csvParser from "csv-parser";

const uploadRouter = express.Router();
const upload = multer({ dest: 'uploads/' });

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
        error:'NO se subio ningun archivo'
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
    if(rowErrors.name || rowErrors.email || rowErrors.age) {
      errors.push({
        row: success.length+1,
        details:rowErrors,
      });
    }else {
      success.push({
        id: success.length+1,
        name: data.name,
        email: data.email,
        age: data.age
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
  return res.send('File uploaded successfully');
      })
    //res.send("File uploaded successfully");
    
    
export default uploadRouter;
