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

const upper_levels = [
    ['MATH','405',true,true,3],
    ['MATH','411',true,true,3],
    ['MATH','412',true,true,3],
    ['MATH','421',true,true,3],
    ['MATH','437',true,true,3],
    ['MATH', '455',true,true,3],
    ['MATH', '456',true,true,3],
    ['MATH','461',true,true,3],
    ['MATH','471',true,true,3],
    ['MATH','475',true,true,3],
    ['MATH','481',true,true,3],
    ['MATH','522',true,true,3],
    ['MATH','523H',true,true,3],
    ['MATH','524',true,true,3],
    ['MATH','532H',true,true,3],
    ['MATH','534H',true,true,3],
    ['MATH','536',true,true,3],
    ['MATH','537',true,true,3],
    ['MATH','545',true,true,3],
    ['MATH','548',true,true,3],
    ['MATH','551',true,true,3],
    ['MATH','552',true,true,3],
    ['MATH','557',true,true,3],
    ['MATH','563H',true,true,3],
    ['MATH','571',true,true,3],
    ['MATH','590STA',true,true,3],
    ['STAT', '315',true,true,3],
    ['STAT','501',true,true,3],
    ['STAT','516',true,true,3],
    ['STAT','525',true,true,3],
    ['STAT','526',true,true,3],
    ['STAT', '530',true,true,3],
    ['STAT','535',true,true,3],
    ['STAT','590T',true,true,3]
]
const coreCourseObjects = createCourseObjects(upper_levels);

console.log(coreCourseObjects);
