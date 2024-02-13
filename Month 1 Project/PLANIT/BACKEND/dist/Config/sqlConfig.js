"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sqlConfig = void 0;
exports.sqlConfig = {
    user: "sa",
    password: "37853801",
    database: "Planit",
    server: "DESKTOP-QO3AGRF",
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000,
    },
    options: {
        encrypt: false,
        trustServerCertificate: true,
    },
};
