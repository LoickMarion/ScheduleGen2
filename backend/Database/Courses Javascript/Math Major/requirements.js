const mathReqs = [
    {
        name: 'Math Core',
        logicType: 'Course-Based',
        allowsOverlap: false,
        criteria: [
            {id: 1, courses: ['CICS110']},
            {id: 2, courses: ['MATH131']},
            {id: 3, courses: ['MATH132']},
            {id: 4, courses: ['MATH233']},
            {id: 5, courses: ['MATH235']}
        ]
    },
    {
        name: 'Intro Abstract',
        logicType: 'Course-Based',
        allowsOverlap: false,
        criteria: [
            {id: 1, courses: ['CS250', 'MATH300']}
        ]
    },
    {
        name: 'Math JYW',
        logicType: 'Course-Based',
        allowsOverlap: false,
        criteria: [
            {id: 1, courses: ['MATH370']}
        ]
        
    },
    {
        name: 'MATH IE',
        logicType: 'Course-Based',
        allowsOverlap: true,
        criteria: [
            {id:1, courses: ['MATH455','MATH456','MATH475','STAT525']},
        ]
    },
    {
        name: 'Advanced Calculus',
        logicType: 'Course-Based',
        allowsOverlap: false,
        criteria: [
            {id: 1, courses: ['MATH421','MATH522','MATH523H','MATH524','MATH532H','MATH534H','MATH548','MATH552']},
        ]  
    },
    {
        name: 'Applied Math Core',
        logicType: 'Course-Based',
        allowsOverlap: false,
        criteria: [
            {id: 1, courses: ['MATH331']},
            {id: 2, courses: ['MATH545']},
            {id: 3, courses: ['MATH551']}
        ]
    },
    {
        name: 'Applied Math Elective',
        logicType: 'Course-Based',
        allowsOverlap: false,
        criteria: [
            {id: 1, courses: ['MATH456','MATH532','MATH534','MATH552'] }
        ]
        
    },
    {
        name: 'MATH400+',
        logicType: 'Course-Based',
        allowsOverlap: false,
        criteria: [
            {id: 1, courses: ['MATH331', 'STAT315'] },
            {id: 2,  department: 'MATH', min_level: 400},
        ]
    },
    {
        name: 'MATH400+Strict',
        logicType: 'Course-Based',
        allowsOverlap: false,
        criteria:  [
            {id: 1, department: 'MATH', min_level: 400 },
        ]
    },
    {
        name: 'MATH400++',
        logicType: 'Course-Based',
        allowsOverlap: false,
        criteria: [
                {id: 1, 
                courses: ['STAT315', 'CS311', 'CS383', 'CS445', 'CS501', 'CS513', 'CS514', 'CS532','CS575','CS589','PHYSICS421','PHYSICS422','PHYSICS423','PHYSICS424']},
                {id: 2,  department: 'MATH', min_level: 400}
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

]

mathPaths = [
    {
        program: 'Applied Math Primary Major',
        allRequirements: mathReqs,
        requirements: [
            { name: 'Math Core', numReq: 1 },
            { name: 'Intro Abstract', numReq: 1 },
            { name: 'MATH JYW', numReq: 1 },
            { name: 'MATH IE', numReq: 1 },
            { name: 'Applied Math Core', numReq: 1 },
            { name: 'Applied Math Elective', numReq: 1 },
            { name: 'MATH400+', numReq: 2 },
            { name: 'MATH400++', numReq: 1 }
        ]
    },
    {
        program: 'Applied Math Secondary Major',
        allRequirements: mathReqs,
        requirements: [
            { name: 'Math Core', numReq: 1 },
            { name: 'Intro Abstract', numReq: 1 },
            { name: 'Applied Math Core', numReq: 1 },
            { name: 'Applied Math Elective', numReq: 1 },
            { name: 'MATH400+', numReq: 1 },
            { name: 'MATH400++', numReq: 2 },
            { name: 'CS300+', numReq: 1}
        ]
    },
    {
        program: 'Math Minor',
        allRequirements: mathReqs,
        requirements: [
            { name: 'Math Core', numReq: 1 },
            { name: 'MATH400+', numReq: 3 },
            { name: 'MATH400++', numReq: 1 },
            { name: 'Intro Abstract', numReq: 1 },
            { name: 'Applied Math Core', numReq: 1 },
            { name: 'Applied Math Elective', numReq: 1 },
            { name: 'MATH400+', numReq: 1 },
            { name: 'MATH400++', numReq: 2 }
        ]
    },
    {
        program: 'Math Minor',
        allRequirements: mathReqs,
        requirements: [
            { name: 'Math Core', numReq: 1 },
            { name: 'MATH400+', numReq: 3 },
            { name: 'MATH400++', numReq: 1 }
        ]
    }
]
module.exports = mathPaths