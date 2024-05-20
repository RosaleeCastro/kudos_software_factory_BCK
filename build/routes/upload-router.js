"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authenticate_1 = require("../midlewears/authenticate");
const authorize_1 = require("../midlewears/authorize");
const fileHandler_multer_1 = require("../midlewears/fileHandler-multer");
const csvProcessor_upload_1 = require("../services/csvProcessor-upload");
const uploadRouter = express_1.default.Router();
// Extender la interfaz Request para incluir la propiedad 'file'
uploadRouter.post("/", authenticate_1.authenticateHandler, (0, authorize_1.authorize)("admin"), fileHandler_multer_1.fileHandler, fileHandler_multer_1.validateFile, (req, res) => {
    (0, csvProcessor_upload_1.processCsv)(req, res);
});
//res.send("File uploaded successfully");
exports.default = uploadRouter;
