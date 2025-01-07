const mathReqs = [
    {
        requirement_name: 'Math Core',
        logic_type: 'Course-Based',
        allows_overlap: false,
        criteria: {
            satisfied_by: [
                { courses: ['CICS110', 'MATH131', 'MATH132', 'MATH233', 'MATH235'] } //AND within the brackets
            ]
        }
    },
    {
        requirement_name: 'Intro Abstract',
        logic_type: 'Course-Based',
        allows_overlap: false,
        criteria: {
            satisfied_by: [
                { courses: ['CS250'] }, //AND within the brackets
                { courses: ['MATH300']}
            ]
        }
    },
    {
        requirement_name: 'Math JYW',
        logic_type: 'Course-Based',
        allows_overlap: false,
        criteria: {
            satisfied_by: [
                { courses: ['MATH370'] }, //AND within the brackets

            ]
        }
    },
    {
        requirement_name: 'MATH IE',
        logic_type: 'Course-Based',
        allows_overlap: true,
        criteria: {
            satisfied_by: [
                { courses: ['MATH455']}, //AND within the brackets
                { courses: ['MATH456']},
                { courses: ['MATH475']},
                { courses: ['STAT525']}
            ]
        }
    },
    {
        requirement_name: 'Advanced Calculus',
        logic_type: 'Course-Based',
        allows_overlap: false,
        criteria: {
            satisfied_by: [
                { courses: ['MATH421']}, //AND within the brackets
                { courses: ['MATH522']},
                { courses: ['MATH523H']},
                { courses: ['MATH524']},
                { courses: ['MATH532H']}, 
                { courses: ['MATH534H']},
                { courses: ['MATH548']},
                { courses: ['MATH552']},

            ]
        }
    },
    {
        requirement_name: 'Applied Math Core',
        logic_type: 'Course-Based',
        allows_overlap: false,
        criteria: {
            satisfied_by: [
                { courses: ['MATH331','MATH545','MATH551'] }, //AND within the brackets

            ]
        }
    },
    {
        requirement_name: 'Applied Math Elective',
        logic_type: 'Course-Based',
        allows_overlap: false,
        criteria: {
            satisfied_by: [
                { courses: ['MATH456'] },
                { courses: ['MATH532'] },
                { courses: ['MATH534'] },
                { courses: ['MATH552'] },
            ]
        }
    },
    {
        requirement_name: 'MATH400+',
        logic_type: 'Course-Based',
        allows_overlap: false,
        criteria: {
            satisfied_by: [
                {department: 'CS', min_level: 400 },
                {courses: ['STAT315']},
                {courses: ['MATH331']}

            ]
        }
    },
    {
        requirement_name: 'MATH400+Strict',
        logic_type: 'Course-Based',
        allows_overlap: false,
        criteria: {
            satisfied_by: [
                {department: 'CS', min_level: 400 },
            ]
        }
    },
    {
        requirement_name: 'MATH400++',
        logic_type: 'Course-Based',
        allows_overlap: false,
        criteria: {
            satisfied_by: [
                {department: 'CS', min_level: 400 },
                {courses: ['STAT315']},
                // {courses: ['BME330']},
                // {courses: ['Biog597GE']},
                // {courses: ['BioChem471']},
                // {courses: ['CHEM471']},
                // {courses: ['CICS397A']},
                {courses: ['CS311']},
                {courses: ['CS383']},
                {courses: ['CS445']},
                {courses: ['CS501']},
                {courses: ['CS513']},
                {courses: ['CS514']},
                {courses: ['CS532']},
                {courses: ['CS575']},
                {courses: ['CS585']},
                {courses: ['CS589']},
                {courses: ['CS590OP']},
                // {courses: ['Chem475']},
                // {courses: ['Chem476']},
                // {courses: ['Chem584']},
                // {courses: ['Chem585']},
                // {courses: ['ChemEng231']},
                // {courses: ['ChemEng475']},
                // {courses: ['CE-Engin260']},
                // {courses: ['Econ309']},
                // {courses: ['Econ452']},
                // {courses: ['ECE213', 'ECE313']},
                // {courses: ['ECE214', 'ECE314']},
                // {courses: ['ECE333']},
                // {courses: ['LING492B']},
                // {courses: ['MIE230']},
                // {courses: ['MIE273']},
                // {courses: ['MIE340']},
                // {courses: ['MIE379']},
                {courses: ['PHYSICS421']},
                {courses: ['PHYSICS422']},
                {courses: ['PHYSICS423']},
                {courses: ['PHYSICS424']},
                // {courses: ['PublicHealth390R']},
                // {courses: ['PublicHealth460']},
                // {courses: ['PublicHealth490Z']},
                // {courses: ['ResEcon313']},


            ]
        }
    }

]

mathPaths = [
    {
        programName: 'Applied Math Primary Major',
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
        programName: 'Applied Math Secondary Major',
        requirements: [
            { name: 'Math Core', numReq: 1 },
            { name: 'Intro Abstract', numReq: 1 },
            { name: 'Applied Math Core', numReq: 1 },
            { name: 'Applied Math Elective', numReq: 1 },
            { name: 'MATH400+', numReq: 1 },
            { name: 'MATH400++', numReq: 2 }
        ]
    },
    {
        programName: 'Math Minor',
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
        programName: 'Math Minor',
        requirements: [
            { name: 'Math Core', numReq: 1 },
            { name: 'MATH400+', numReq: 3 },
            { name: 'MATH400++', numReq: 1 }
        ]
    }
]