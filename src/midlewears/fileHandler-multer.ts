import { Request, Response, NextFunction } from "express";
import multer from "multer";
import fs from "fs";
import path from "path";

const upload = multer({ dest: "uploads/" });



export const fileHandler = upload.single("file");

export const validateFile = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
    // Asegurarse de que la carpeta 'uploads' exista
  const uploadDir = path.join(__dirname, "../../uploads");
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
    console.log("Creado el directorio uploads");
  } else {
    console.log("El directorio uploads ya existes");
  }

  if (!req.file) {
    return res.status(400).json({
      ok: false,
      error: "No se subió ningún archivo",
    });
  }

  if (req.file.mimetype !== "text/csv") {
    fs.unlink(req.file.path, (err) => {
      if (err) console.error("Error en el borrado del archivo", err);
    });
    return res.status(400).json({
      ok: false,
      error: "El archivo no es un CSV",
    });
  }

  return next();
};
