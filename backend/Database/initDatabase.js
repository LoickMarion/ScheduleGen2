const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./courses.db', (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Connected to SQLite database.');
    }
});

// Create tables
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS Course (
            department TEXT NOT NULL,
            level INTEGER NOT NULL,
            level_suffix TEXT,
            credits INTEGER NOT NULL,
            prerequisites TEXT,
            PRIMARY KEY (department, level, suffix)
        );
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS Requirement (
            requirement_id INTEGER PRIMARY KEY AUTOINCREMENT,
            requirement_name TEXT NOT NULL UNIQUE,
            logic_type TEXT NOT NULL,
            criteria TEXT NOT NULL
        );
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS MajorRequirement (
            major_id TEXT NOT NULL,
            requirement_id TEXT NOT NULL,
            PRIMARY KEY (major_id, requirement_id),
            FOREIGN KEY (requirement_id) REFERENCES Requirement (requirement_id)
        );
    `);
    console.log('Tables created successfully.');

});

// Close database
db.close((err) => {
    if (err) {
        console.error('Error closing database:', err.message);
    } else {
        console.log('Database closed.');
    }
});
