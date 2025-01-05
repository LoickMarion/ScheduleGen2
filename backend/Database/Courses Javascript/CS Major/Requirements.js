/*        CREATE TABLE IF NOT EXISTS Requirement (
            requirement_id INTEGER PRIMARY KEY AUTOINCREMENT,
            requirement_name TEXT NOT NULL UNIQUE,
            requirement_type TEXT NOT NULL,
            logic_type TEXT NOT NULL,
            criteria TEXT NOT NULL
        ); */

cs_reqs = [
    {
        requirement_name: 'CS Major Core Classes',
        logic_type: 'Course-Based',
        allows_overlap: false,
        criteria: {
            satisfied_by: [
                { courses: ['CICS110', 'CICS160', 'CICS210', 'CS220', 'CS230', 'CS240', 'CS250', 'CS311',' MATH131','MATH132','MATH233','MATH235'] } //AND within the brackets
            ]
        }
    },
    {
        requirement_name: 'CS Minor Core Classes',
        logic_type: 'Course-Based',
        allows_overlap: false,
        criteria: {
            satisfied_by: [
                { courses: ['CICS110', 'CICS160', 'CICS210'] } //AND within the brackets
            ]
        }
    },
    {
        requirement_name: 'CS JYW',
        logic_type: 'Course-Based',
        allows_overlap: false,
        criteria: {
            satisfied_by: [
                { courses: ['CS305'] } //AND within the brackets
            ]
        }
    },
    {
        requirement_name: 'CS IE',
        logic_type: 'Course-Based',
        allows_overlap: true,
        criteria: {
            satisfied_by: [
                { courses: ['CS320'] }, //logical OR between brackets, any one bracket being satisfied is sufficient.
                { courses: ['CS326'] } // need to figure a way to show that this can double count
            ]
        }
    },
    {
        requirement_name: 'CS300+',
        logic_type: 'Course-Based',
        allows_overlap: false,
        criteria: {
            satisfied_by: [
                { department: 'CS', min_level: 300 }
            ]
        }
    },
    {
        requirement_name: 'CS300++',
        logic_type: 'Course-Based',
        allows_overlap: false,
        criteria: {
            satisfied_by: [
                { department: 'CS', min_level: 300},
                { courses: ['MATH411'] },
                { courses: ['MATH545'] },
                { courses: ['MATH551'] },
                { courses: ['MATH552'] },
                { courses: ['LINGUIST301'] },
                { courses: ['ECE547'] },
                { courses: ['ECE668'] }
            ]
        }
    },
    {
        requirement_name: 'CS400+',
        logic_type: 'Course-Based',
        allows_overlap: false,
        criteria: { satisfied_by: [
            {department: 'CS', min_level: 400 }
        ]}
    },
    {
        requirement_name: 'CS500+',
        logic_type: 'Course-Based',
        allows_overlap: false,
        criteria: { satisfied_by: [
            {department: 'CS', min_level: 500}
        ]}
    },

    {
        requirement_name: 'CS200Level ',
        logic_type: 'Course-Based',
        allows_overlap: false,
        criteria: {satisfied_by: [
            {courses: ['CS220']},
            {courses: ['CS230']},
            {courses: ['CS240']},
            {courses: ['CS250']}
        ] }
    },
    {
        requirement_name: 'CSLabScience ',
        logic_type: 'Course-Based',
        allows_overlap: false,
        criteria: {satisfied_by: [
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

        ] }
    }
];

cs_paths = [
    {
        program: 'CS Primary Major',
        requirements: [('CS Major Core Classes',1),('CS JYW',1), ('CS IE', 1), ('CS300+', 3), ('CS300++', 1), ('CS400+', 3), ('CSLabScience',2)]
    },
    {
        program: 'CS Secondary Major',
        requirements: [('CS Major Core Classes',1),('CS300+', 3), ('CS300++', 1),('CS400+',3),('CSLabScience',2)]
    },
    {
        program: 'CS Minor',
        requirements: [('CS Minor Core Classes',1),('CS200Level', 2), ('CS300+', 1)]
    },
    {
        program: 'CS 4+1',
        requirements: [('CS Major Core Classes',1),('CS JYW',1), ('CS IE', 1), ('CS300+', 3), ('CS300++', 1),('CS400+',1),('CS500+',4),('CSLabScience',2)]
    },
    //4 + 1 wont work properly because no lgoic to show that you cant count towards cs bachelors and masters and another major, I might just implement 4+1 as a separate major that takes 4 500 plus idk
    //add honors wwhen time
]
