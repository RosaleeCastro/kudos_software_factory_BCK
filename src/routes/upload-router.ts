import express, { Request, Response } from "express";
import multer from "multer";
import fs from "fs";
import csvParser from "csv-parser";
import { authenticateHandler } from "../midlewears/authenticate";
import { authorize } from "../midlewears/authorize";

const uploadRouter = express.Router();
const upload = multer({ dest: "uploads/" });

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
  authorize("admin"),
  upload.single("file"),
  (req: Request, res: Response) => {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const errors: any[] = [];
    const success: any[] = [];

    fs.createReadStream(req.file.path)
      .pipe(csvParser())
      .on("data", (data) => {
        const errorDetails: any = {
          name: !data.name ? "El campo 'name' no puede estar vacío" : null,
          email: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)
            ? 'El formato del campo "email" es inválido.'
            : null,
          age: isNaN(data.age) || data.age < 0
            ? "El campo 'age' debe ser un número positivo"
            : null,
        };

        if (!data.name || !data.email || !data.age || errorDetails.email || errorDetails.age) {
          errors.push({
            row: success.length + 1 + errors.length,
            details: errorDetails,
          });
        } else {
          success.push({
            id: success.length + 1,
            name: data.name,
            email: data.email,
            age: data.age,
          });
        }
      })
      .on("end", () => {
        if (req.file) {
            fs.unlinkSync(req.file.path); // Eliminar el archivo temporal
            res.json({
              ok: true,
              data: {
                success,
                errors,
              },
            });
          } else {
            res.status(400).json({ error: "No file uploaded" });
          }
      })
      .on("error", (error) => {
        res.status(500).json({ error: error.message });
      });
      return;
  }
);

export default uploadRouter;
