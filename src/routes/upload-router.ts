import   express, { Request, Response } from "express";
import { authenticateHandler } from "../midlewears/authenticate";
import { authorize } from "../midlewears/authorize";
import { fileHandler, validateFile } from "../midlewears/fileHandler-multer";
import { processCsv } from "../services/csvProcessor-upload";

const uploadRouter = express.Router();



// Extender la interfaz Request para incluir la propiedad 'file'

uploadRouter.post(
  "/",
  authenticateHandler,
  authorize("admin"), fileHandler,validateFile,
  (req:Request, res: Response) => {
    processCsv(req,res)
      })
    //res.send("File uploaded successfully");
    
    
export default uploadRouter