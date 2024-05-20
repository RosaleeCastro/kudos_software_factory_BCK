"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateFile = exports.fileHandler = void 0;
const multer_1 = __importDefault(require("multer"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const upload = (0, multer_1.default)({ dest: "uploads/" });
exports.fileHandler = upload.single("file");
const validateFile = (req, res, next) => {
    // Asegurarse de que la carpeta 'uploads' exista
    const uploadDir = path_1.default.join(__dirname, "../../uploads");
    if (!fs_1.default.existsSync(uploadDir)) {
        fs_1.default.mkdirSync(uploadDir);
        console.log("Creado el directorio uploads");
    }
    else {
        console.log("El directorio uploads ya existes");
    }
    if (!req.file) {
        return res.status(400).json({
            ok: false,
            error: "No se subió ningún archivo",
        });
    }
    if (req.file.mimetype !== "text/csv") {
        fs_1.default.unlink(req.file.path, (err) => {
            if (err)
                console.error("Error en el borrado del archivo", err);
        });
        return res.status(400).json({
            ok: false,
            error: "El archivo no es un CSV",
        });
    }
    return next();
};
exports.validateFile = validateFile;
