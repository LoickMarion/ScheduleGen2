function createCourseObjects(courseArray) {
    return courseArray.map((course, index) => {
        const [department, code, fall, spring, credits] = course;
        const levelMatch = code.match(/^(\d+)([A-Z]*)$/); // Separate level and suffix
        const level = levelMatch ? parseInt(levelMatch[1], 10) : null;
        const level_suffix = levelMatch && levelMatch[2] ? levelMatch[2] : null; // Store suffix or null
                
        // Determine semester availability
        let availability = '';
        if (fall && spring) availability = 'both';
        else if (fall) availability = 'fall';
        else if (spring) availability = 'spring';
        let prerequisites = []
        return {
            department,
            level,
            level_suffix,
            credits,
            prerequisites,
            availability
        };
    });
}

// Generate the course objects for core classes

const electives500 = [
    ['CS', '501', false, true, 3],
    ['CS', '515', true, true, 3],
    ['CS', '520', true, true, 3],
    ['CS', '528', true, false, 3],
    ['CS', '532', true, true, 3],
    ['CS', '535', true, true, 3],
    ['CS', '546', true, true, 3],
    ['CS', '550', true, true, 3],
    ['CS', '560', true, true, 3],
    ['CS', '561', true, true, 3],
    ['CS', '564', true, true, 3],
    ['CS', '565', true, true, 3],
    ['CS', '574', true, true, 3],
    ['CS', '589', true, true, 3],
    ['CS', '590AB', true, true, 3],
    ['CS', '590AE', true, true, 3],
    ['CS', '590X', true, true, 3]
  ];

const coreCourseObjects = createCourseObjects(electives500);

console.log(coreCourseObjects);
