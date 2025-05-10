import { createPool } from 'mysql2/promise';
import path from 'node:path';
import { config } from 'dotenv';

config({ path: "./config/.env" });

export const pool = createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME
})