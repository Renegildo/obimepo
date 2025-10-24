import pool from './index.js';
import { readdirSync, readFileSync } from 'fs';
import path, { join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const initDb = async () => {
    try {
        console.log('Initializing db...');
        const sqlDirPath = join(__dirname, '../../', 'sql');
        const sqlFiles = readdirSync(sqlDirPath).filter(file => file.endsWith('.sql'));

        for (const file of sqlFiles) {
            const filePath = join(sqlDirPath, file);
            const sql = readFileSync(filePath, 'utf-8');
            console.log(`Running ${file}...`);
            await pool.query(sql);
        }

        console.log('Database initialized successfully!');
    } catch (err) {
        console.error('Error initializing database:', err);
    } finally {
        await pool.end();
    }
};

export default initDb;