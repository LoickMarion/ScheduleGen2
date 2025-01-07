/*        CREATE TABLE IF NOT EXISTS Requirement (
            requirement_id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL UNIQUE,
            requirement_type TEXT NOT NULL,
            logicType TEXT NOT NULL,
            criteria TEXT NOT NULL
        ); */

const csReqs = [
    {
        name: 'CS Major Core Classes',
        logicType: 'Course-Based',
        allowsOverlap: false,
        criteria: [
            { courses: ['CICS110', 'CICS160', 'CICS210', 'CS220', 'CS230', 'CS240', 'CS250', 'CS311',' MATH131','MATH132','MATH233','MATH235'] } //AND within the brackets
        ]
        
    },
    {
        name: 'CS Minor Core Classes',
        logicType: 'Course-Based',
        allowsOverlap: false,
        criteria: [
            { courses: ['CICS110', 'CICS160', 'CICS210'] } //AND within the brackets
        ]
        
    },
    {
        name: 'CS JYW',
        logicType: 'Course-Based',
        allowsOverlap: false,
        criteria: [
            { courses: ['CS305'] } //AND within the brackets
        ]
    },
    {
        name: 'CS IE',
        logicType: 'Course-Based',
        allowsOverlap: true,
        criteria: [
            { courses: ['CS320'] }, //logical OR between brackets, any one bracket being satisfied is sufficient.
            { courses: ['CS326'] } // need to figure a way to show that this can double count
        ]
    },
    {
        name: 'CS300+',
        logicType: 'Course-Based',
        allowsOverlap: false,
        criteria: [
            { department: 'CS', minLevel: 300 }
        ]
        
    },
    {
        name: 'CS300++',
        logicType: 'Course-Based',
        allowsOverlap: false,
        criteria: [
            { department: 'CS', minLevel: 300},
            { courses: ['MATH411'] },
            { courses: ['MATH545'] },
            { courses: ['MATH551'] },
            { courses: ['MATH552'] },
            { courses: ['LINGUIST301'] },
            { courses: ['ECE547'] },
            { courses: ['ECE668'] }
        ]
        
    },
    {
        name: 'CS400+',
        logicType: 'Course-Based',
        allowsOverlap: false,
        criteria: [
            {department: 'CS', minLevel: 400 }
        ]
    },
    {
        name: 'CS500+',
        logicType: 'Course-Based',
        allowsOverlap: false,
        criteria: [
            {department: 'CS', minLevel: 400 }
        ]
    },
    {
        name: 'CS500+',
        logicType: 'Course-Based',
        allowsOverlap: false,
        criteria:  [
            {department: 'CS', minLevel: 500}
        ]
    },

    {
        name: 'CS200Level ',
        logicType: 'Course-Based',
        allowsOverlap: false,
        criteria: [
            {courses: ['CS220']},
            {courses: ['CS230']},
            {courses: ['CS240']},
            {courses: ['CS250']}
        ] 
    },
    {
        name: 'CSLabScience ',
        logicType: 'Course-Based',
        allowsOverlap: false,
        criteria: [
            {courses: ['CICS256']},
            {courses: ['CHEM111']},
            {courses: ['CHEM112']},
            {courses: ['CHEM121']},
            {courses: ['CHEM122']},
            {courses: ['GEOL101']},
            {courses: ['GEOL103','GEOL131']},
            {courses: ['GEOL105','GEOL131']},
            {courses: ['PHYSICS151']},
            {courses: ['PHYSICS181']},
            {courses: ['PHYSICS152']},
            {courses: ['PHYSICS182']},

        ] 
    }
];

csPaths = [
    {
        program: 'CS Primary Major',
        requirements: [           
            { name: 'CS Major Core Classes', numReq: 1 },
            { name: 'CS JYW', numReq: 1 },
            { name: 'CS IE', numReq: 1 },
            { name: 'CS300+', numReq: 3 },
            { name: 'CS300++', numReq: 1 },
            { name: 'CS400+', numReq: 3 },
            { name: 'CSLabScience', numReq: 2 }]
    },
    {
        program: 'CS Secondary Major',
        requirements: [            
            { name: 'CS Major Core Classes', numReq: 1 },
            { name: 'CS300+', numReq: 3 },
            { name: 'CS300++', numReq: 1 },
            { name: 'CS400+', numReq: 3 },
            { name: 'CSLabScience', numReq: 2 }]
    },
    {
        program: 'CS Minor',
        requirements: [            
            { name: 'CS Minor Core Classes', numReq: 1 },
            { name: 'CS200Level', numReq: 2 },
            { name: 'CS300+', numReq: 1 }]
    },
    {
        program: 'CS 4+1',
        requirements: [            
            { name: 'CS Major Core Classes', numReq: 1 },
            { name: 'CS JYW', numReq: 1 },
            { name: 'CS IE', numReq: 1 },
            { name: 'CS300+', numReq: 3 },
            { name: 'CS300++', numReq: 1 },
            { name: 'CS400+', numReq: 1 },
            { name: 'CS500+', numReq: 4 },
            { name: 'CSLabScience', numReq: 2 }]
    },
    //4 + 1 wont work properly because no lgoic to show that you cant count towards cs bachelors and masters and another major, I might just implement 4+1 as a separate major that takes 4 500 plus idk
    //add honors wwhen time
]

module.exports = { csReqs, csPaths }