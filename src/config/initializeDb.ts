import { executeQuery } from '../helper/QueryHelper';
import pool from "./database"
import bcrypt from 'bcrypt';

const initDb = async () => {
    const createMasterJournalsTable = `
        CREATE TABLE IF NOT EXISTS master_journals (
            id INT AUTO_INCREMENT PRIMARY KEY,
            description VARCHAR(150) NOT NULL UNIQUE,
            created_at DATETIME NOT NULL
        );
    `;

    const createUsersTable = `
        CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            username VARCHAR(100) NOT NULL UNIQUE,
            first_name VARCHAR(50) NOT NULL,
            last_name VARCHAR(50) NOT NULL,
            email VARCHAR(50) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL,
            created_at DATETIME NOT NULL,
            updated_at DATETIME NOT NULL,
            deleted_at DATETIME NULL
        );
    `;

    const createJournalsTable = `
        CREATE TABLE IF NOT EXISTS journals (
            id INT AUTO_INCREMENT PRIMARY KEY,
            master_journal_id INT NOT NULL,
            user_id INT NOT NULL,
            description VARCHAR(150) NOT NULL,
            date DATE NOT NULL,
            amount DECIMAL(28, 2) NOT NULL,
            created_at DATETIME NOT NULL,
            updated_at DATETIME NOT NULL,
            deleted_at DATETIME NULL
        );
    `;

    const createJournalHistoriesTable = `
        CREATE TABLE IF NOT EXISTS journal_histories (
            id INT AUTO_INCREMENT PRIMARY KEY,
            journal_id INT NOT NULL,
            user_id INT NOT NULL,
            description VARCHAR(150) NOT NULL,
            date DATE NOT NULL,
            amount DECIMAL(28, 2) NOT NULL,
            created_at DATETIME NOT NULL,
            updated_at DATETIME NOT NULL,
            deleted_at DATETIME NULL
        );
    `;

    try {
        await executeQuery(createMasterJournalsTable, []);
        console.log('master_journals table created or already exists');

        await executeQuery(createUsersTable, []);
        console.log('users table created or already exists');

        await executeQuery(createJournalsTable, []);
        console.log('journals table created or already exists');

        await executeQuery(createJournalHistoriesTable, []);
        console.log('journal_histories table created or already exists');

        // Insert initial data
        const now = new Date();
        const passwordHash = await bcrypt.hash('password', 10);

        const insertUser = `
            INSERT INTO users (username, first_name, last_name, email, password, created_at, updated_at)
            VALUES ('admin', 'Admin', 'User', 'admin@example.com', ?, ?, ?)
            ON DUPLICATE KEY UPDATE username = username;
        `;

        const insertMasterJournals = `
            INSERT INTO master_journals (description, created_at)
            VALUES 
            ('Opening Balance', ?),
            ('Expenditure Balance', ?),
            ('Closing Balance', ?)
            ON DUPLICATE KEY UPDATE description = description;
        `;

        await executeQuery(insertUser, [passwordHash, now, now]);
        console.log('Initial user inserted');

        await executeQuery(insertMasterJournals, [now, now, now]);
        console.log('Master journals inserted');

    } catch (error) {
        console.error('Error initializing database:', error);
    } finally {
       await pool.end()
       process.exit(0)
    }
};

initDb();
