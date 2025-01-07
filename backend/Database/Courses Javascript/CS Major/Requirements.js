const csReqs = [
    {
        name: 'CS Major Core Classes',
        logicType: 'Course-Based',
        allowsOverlap: false,
        criteria: [
            { id: 1, courses: ['CICS110']},
            { id: 2, courses: ['CICS160']},
            { id: 3, courses: ['CICS210']},
            { id: 4, courses: ['CS220']},
            { id: 5, courses: ['CS230']},
            { id: 6, courses: ['CS240']},
            { id: 7, courses: ['CS250']},
            { id: 8, courses: ['CS311']},
            { id: 9, courses: ['MATH131']},
            { id: 10, courses: ['MATH132']},
            { id: 11, courses: ['MATH233']},
            { id: 12, courses: ['MATH235']}
        ]
        
    },
    {
        name: 'CS Minor Core Classes',
        logicType: 'Course-Based',
        allowsOverlap: false,
        criteria: [
            { id: 1, courses: ['CICS110']},
            { id: 2, courses: ['CICS160']},
            { id: 3, courses: ['CICS210']},
        ]
        
    },
    {
        name: 'CS JYW',
        logicType: 'Course-Based',
        allowsOverlap: false,
        criteria: [
            { id: 1, courses: ['CS305'] } 
        ]
    },
    {
        name: 'CS IE',
        logicType: 'Course-Based',
        allowsOverlap: true,
        criteria: [
            { id: 1, courses: ['CS320','CS326'] }
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
            { id: 1, courses: ['MATH441', 'MATH545', 'MATH551', 'MATH552', 'LINGUIST301', 'ECE547', 'ECE668'], department: 'CS', minLevel: 300 }
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
        name: 'CS200Level',
        logicType: 'Course-Based',
        allowsOverlap: false,
        criteria: [
            {id: 1, courses: ['CS220']},
            {id: 2, courses: ['CS230']},
            {id: 3, courses: ['CS240']},
            {id: 4, courses: ['CS250']}
        ] 
    },
    {
        name: 'CSLabScience',
        logicType: 'Course-Based',
        allowsOverlap: false,
        criteria: [
            {id: 1, courses: ['CICS256']},
            {id: 2, courses: ['CHEM111']},
            {id: 3, courses: ['CHEM112']},
            {id: 4, courses: ['CHEM121']},
            {id: 5, courses: ['CHEM122']},
            {id: 6, courses: ['GEOL101']},
            {id: 7, courses: ['GEOL103','GEOL131']},
            {id: 8, courses: ['GEOL105','GEOL131']},
            {id: 9, courses: ['PHYSICS151']},
            {id: 10, courses: ['PHYSICS181']},
            {id: 11, courses: ['PHYSICS152']},
            {id: 12, courses: ['PHYSICS182']},

        ] 
    }
];

csPaths = [
    {
        program: 'CS Primary Major',
        allRequirements: csReqs,
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
        allRequirements: csReqs,
        requirements: [            
            { name: 'CS Major Core Classes', numReq: 1 },
            { name: 'CS300+', numReq: 3 },
            { name: 'CS300++', numReq: 1 },
            { name: 'CS400+', numReq: 3 },
            { name: 'CSLabScience', numReq: 2 }]
    },
    {
        program: 'CS Minor',
        allRequirements: csReqs,
        requirements: [            
            { name: 'CS Minor Core Classes', numReq: 1 },
            { name: 'CS200Level', numReq: 2 },
            { name: 'CS300+', numReq: 1 }]
    },
    {
        program: 'CS 4+1',
        allRequirements: csReqs,
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

module.exports = csPaths