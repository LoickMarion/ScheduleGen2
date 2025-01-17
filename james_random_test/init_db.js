const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');

const db = new sqlite3.Database('courses.db', (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Connected to the SQLite database.');
});


db.run(`DROP TABLE IF EXISTS courses`, (err) => {
    if (err) {
        return console.error(`Error dropping table: ${err.message}`);
    }
    console.log('Dropped the existing courses table.');


    db.run(
        `CREATE TABLE IF NOT EXISTS courses(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            department TEXT,
            code TEXT NOT NULL,
            suffix TEXT,
            fall BOOLEAN,
            spring BOOLEAN,
            credits INTEGER
        );`,
        (err) => {
            if (err) {
                return console.error(`Error creating table: ${err.message}`);
            }
            console.log('Courses table is ready.');

            // Process JSON files
            const courseDir = './courses/';
            fs.readdir(courseDir, (err, files) => {
                if (err) {
                    return console.error(`Error reading directory: ${err.message}`);
                }

                const jsonFiles = files.filter(file => path.extname(file).toLowerCase() === '.json');
                let pendingInserts = 0;

                jsonFiles.forEach((file) => {
                    const filePath = path.join(courseDir, file);

                    fs.readFile(filePath, 'utf8', (err, data) => {
                        if (err) {
                            return console.error(`Error reading file: ${err.message}`);
                        }

                        try {
                            const courses = JSON.parse(data);
                            pendingInserts += courses.length;

                            courses.forEach((course) => {
                                db.run(
                                    `INSERT INTO courses (department, code, suffix, fall, spring, credits) 
                                     VALUES (?, ?, ?, ?, ?, ?)`,
                                    [course.department, course.code, course.suffix, course.fall, course.spring, course.credits],
                                    (err) => {
                                        if (err) {
                                            console.error(`Error inserting data: ${err.message}`);
                                        } else {
                                            if(course.suffix){
                                                console.log(`Inserted course: ${course.department + course.code + course.suffix}`);
                                            } else {
                                                console.log(`Inserted course: ${course.department + course.code}`);
                                            }
                                        }

                                        
                                        pendingInserts--;
                                        if (pendingInserts === 0) {
                                            queryDatabaseAndClose();
                                        }
                                    }
                                );
                            });
                        } catch (parseErr) {
                            console.error(`Error parsing JSON file ${file}: ${parseErr.message}`);
                        }
                    });
                });

                
                if (jsonFiles.length === 0) {
                    queryDatabaseAndClose();
                }
            });
        }
    );
});


function queryDatabaseAndClose() {
    db.all(`SELECT * FROM courses`, [], (err, rows) => {
        if (err) {
            return console.error(`Error querying database: ${err.message}`);
        }
        console.log('Courses in the database:');
        console.log(rows);

        db.close((err) => {
            if (err) {
                return console.error(`Error closing database: ${err.message}`);
            }
            console.log('Database connection closed.');
        });
    });
}