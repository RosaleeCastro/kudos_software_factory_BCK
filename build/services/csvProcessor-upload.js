"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.processCsv = void 0;
const fs_1 = __importDefault(require("fs"));
const csv_parser_1 = __importDefault(require("csv-parser"));
const data_1 = require("../data");
const processCsv = (req, res) => {
    const errors = [];
    const success = [];
    if (req.file) {
        fs_1.default.createReadStream(req.file.path)
            .pipe((0, csv_parser_1.default)())
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
            }
            else {
                const user = {
                    id: success.length + errors.length + 1,
                    name: data.name,
                    email: data.email,
                    age: parseInt(data.age, 10),
                };
                success.push(user);
                console.log(user);
                console.log(typeof user);
                (0, data_1.insertIntoDatabase)(user); // Aquí se inserta en la base de datos
            }
        })
            .on('end', () => {
            if (req.file) {
                fs_1.default.unlink(req.file.path, (err) => {
                    if (err)
                        console.error('Error en el borrado del archivo', err);
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
            fs_1.default.unlink(req.file.path, (err) => {
                if (err)
                    console.error('Error en el borrado del archivo', err);
            });
        });
    }
    else {
        res.status(400).json({ ok: false, error: 'No se subio archivo' });
    }
};
exports.processCsv = processCsv;
