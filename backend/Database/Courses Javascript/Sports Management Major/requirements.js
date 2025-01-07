const sportsManagementReqs = [
    {
        requirement_name: 'BS_core',
        logic_type: 'Course-Based',
        allows_overlap: false,
        criteria: [
            { id: '1', options: ['ECON103', 'RES-ECON102'] },
            { id: '2', options: ['RES_ECON104'] },
            { id: '3', options: ['OIM210'] },
            { id: '4', options: ['RES-ECON212', 'STATS240', 'OIM240'] },
            { id: '5', options: ['MATH121', 'MATH121+'] }, // Use regex to signify levels
            { id: '6', options: ['ACCOUNTG221'] },
            { id: '7', options: ['SCH-MGMT260'] },
            { id: '8', options: ['MARKETNG301'] },
            { id: '9', options: ['FINANCE301'] },
            { id: '10', options: ['MANAGMNT301'] },
            { id: '11', options: ['SCH-MGMT310'] }
        ]
    },
    {
        requirement_name: 'Sports_management_major_core',
        logic_type: 'Course-Based',
        allows_overlap: false,
        criteria: [
            {id: '1', options: ['SPORTMGT200', 'SPORTMGT202']},
            {id: '2', options: ['SPORTMGT210']},
            {id: '3', options: ['SCH-MGMT200']},
            {id: '4', options: ['SCH-MGMT201']},
            {id: '5', options: ['SPORTMGT300']},
            {id: '6', options: ['SPORTMGT321']},
            {id: '7', options: ['SPORTMGT335']},
            {id: '8', options: ['SPORTMGT424']},
            {id: '9', options: ['SPORTMGT494PI']}
        ]
    }, 
    {
        requirement_name: 'General_curriculum_track',
        logic_type: 'Course-Based',
        allows_overlap: false,
        criteria: [
            {id: '1', options: ['SPORTMGM200+']},
            {id: '2', options: ['SPORTMGM200+']},
            {id: '3', options: ['SPORTMGM200+']}
        ]
    }
];