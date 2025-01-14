const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('courses.db', (err) => {
    if (err) {
        console.error(`Error accessing the database: ${err.message}`);
    }
});

/**
 * 
 * Sychronous function, cannot return anything
 * 
 * @param {Database} db - course database
 * @param {string} subject - subject desired (e.g math, compsci)
 * @returns {void}
 */
function selectSubjectCourses(db, subject) {
    db.all(
        `SELECT * FROM courses WHERE department = ?`,
        [subject.toUpperCase()],
        (err, rows) => {
            if (err) {
                console.error(`Error fetching courses: ${err.message}`);
            } else {
                 console.log(rows)
            }
        }
    )
}

/**
 * 
 * Async function, returns array
 * 
 * @param {Database} db - course database
 * @param {string} subject - specific subject of courses (e.g Math, Compsci)
 * @returns {Array<object>} - Array of all courses with the specified subject
 */
async function asyncSelectSubjectCourses(db, subject) {
    return new Promise((resolve, reject) => {
        db.all(
            `SELECT * FROM courses WHERE department = ?`,
            [subject.toUpperCase()], // Use parameterized queries
            (err, rows) => {
                if (err) {
                    reject(err); // Reject if there's an error
                } else {
                    resolve(rows); // Resolve with the result
                }
            }
        );
    });
}

db.close((err) => {
    if (err) {
        console.error(`Error closing the database: ${err.message}`)
    } else {
        console.log('Database connection closed.')
    }
})