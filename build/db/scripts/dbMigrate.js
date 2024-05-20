"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config"); // configurar acceso a las variables de entorno del archivo .env
const node_path_1 = __importDefault(require("node:path"));
const node_fs_1 = __importDefault(require("node:fs"));
const __1 = require("..");
const umzug_1 = require("umzug");
const migrator = new umzug_1.Umzug({
    migrations: { glob: node_path_1.default.join(__dirname, "..", "migrations", "*.ts") }, // directorio de migraciones
    context: { query: __1.query }, // objeto que estará disponible en funciones 'up' y 'down' en archivos de migración
    storage: new umzug_1.JSONStorage({
        path: node_path_1.default.join(__dirname, "..", "migrations", "migrations.json"), // ubicación del archivo de historial de migraciones
    }),
    logger: console,
    create: {
        folder: node_path_1.default.join(__dirname, "..", "migrations"), // directorio de destino
        template: (filepath) => [
            [
                filepath,
                node_fs_1.default
                    .readFileSync(node_path_1.default.join(__dirname, "..", "template/migration-template.ts"))
                    .toString(),
            ],
        ],
    },
});
migrator.runAsCLI(); // iniciar CLI
