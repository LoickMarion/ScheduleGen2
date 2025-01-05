function addCourse(db, department, level, level_suffix, course_name, credits, prerequisites) {
    const query = `
        INSERT INTO Course (department, level, level_suffix, course_name, credits, prerequisites)
        VALUES (?, ?, ?, ?, ?, ?);
    `;
    db.run(query, [department, level, level_suffix, course_name, credits, prerequisites], function(err) {
        if (err) {
            console.error('Error adding course:', err.message);
        } else {
            console.log('Course added successfully.');
        }
    });
}


function queryCourses(db, callback) {
    const query = `SELECT * FROM Course;`;
    db.all(query, [], (err, rows) => {
        if (err) {
            console.error('Error querying courses:', err.message);
        } else {
            callback(rows);
        }
    });
}

function addRequirement(db, requirement_name, requirement_type, logic_type, criteria) {
    const query = `
        INSERT INTO Requirement (requirement_name, requirement_type, logic_type, criteria)
        VALUES (?, ?, ?, ?);
    `;
    db.run(query, [requirement_name, requirement_type, logic_type, criteria], function(err) {
        if (err) {
            console.error('Error adding requirement:', err.message);
        } else {
            console.log('Requirement added successfully.');
        }
    });
}


function addMajorRequirement(db, major_id, requirement_id) {
    const query = `
        INSERT INTO MajorRequirement (major_id, requirement_id)
        VALUES (?, ?);
    `;
    db.run(query, [major_id, requirement_id], function(err) {
        if (err) {
            console.error('Error adding major requirement:', err.message);
        } else {
            console.log('Major requirement added successfully.');
        }
    });
}

