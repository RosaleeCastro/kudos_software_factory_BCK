import fs from 'fs';
import csvParser from 'csv-parser';
import { Request, Response } from 'express';
import { insertIntoDatabase } from '../data';


// Extender la interfaz Request para incluir la propiedad 'file'
declare global {
    namespace Express {
      interface Request {
        file?: Express.Multer.File;
      }
    }
  }

export const processCsv = (req: Request, res: Response) => {
  const errors: any[] = [];
  const success: any[] = [];

 if (req.file) {
  fs.createReadStream(req.file.path)
  .pipe(csvParser())
  .on('data', (data) => {
    const rowErrors = {
      name: !data.name ? 'El campo "name" no puede estar vacío.' : null,
      email: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email) ? 'El formato del campo "email" es inválido.' : null,
      age: isNaN(data.age) || data.age < 0 ? 'El campo "age" debe ser un número positivo.' : null,
    };

    if (Object.values(rowErrors).some((error) => error !== null)) {
      errors.push({
        row: success.length + errors.length + 1,
        details: rowErrors,
      });
    } else {
      const user = {
        id: success.length + errors.length + 1,
        name: data.name,
        email: data.email,
        age: parseInt(data.age, 10),
      };
      success.push(user);
      
    
      insertIntoDatabase(user); // Aquí se inserta en la base de datos
    }
  })
  .on('end', () => {
    if(req.file){
      fs.unlink(req.file.path, (err) => {
        if (err) console.error('Error en el borrado del archivo', err);
      });

      res.json({
        ok: true,
        data: {
          success,
          errors,
        },
      });
 
    }
  })
  .on('error', (err) => {
    console.error('Error processing file:', err);
    res.status(500).json({ ok: false, error: 'Error processing file' });
    fs.unlink(req.file!.path, (err) => {
      if (err) console.error('Error en el borrado del archivo', err);
    });
  });
} else {
  res.status(400).json({ ok: false, error: 'No se subio archivo' });
 }
};
