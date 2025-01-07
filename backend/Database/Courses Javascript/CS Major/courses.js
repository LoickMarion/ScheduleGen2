const courses = [
    {
      department: 'CICS',
      level: 110,
      level_suffix: null,
      credits: 4,
      prerequisites: [],
      availability: 'both'
    },
    {
      department: 'CICS',
      level: 160,
      level_suffix: null,
      credits: 4,
      prerequisites: [['CICS110']],
      availability: 'both'
    },
    {
      department: 'CS',
      level: 198,
      level_suffix: true,
      credits: 1,
      prerequisites: [['CICS160']],
      availability: 'both'
    },
    {
      department: 'CICS',
      level: 210,
      level_suffix: null,
      credits: 4,
      prerequisites: [['CICS160']],
      availability: 'both'
    },
    {
      department: 'CS',
      level: 220,
      level_suffix: null,
      credits: 4,
      prerequisites: [['CICS210']],
      availability: 'both'
    },
    {
      department: 'CS',
      level: 230,
      level_suffix: null,
      credits: 4,
      prerequisites: [['CICS210']],
      availability: 'both'
    },
    {
      department: 'CS',
      level: 240,
      level_suffix: null,
      credits: 4,
      prerequisites: [['CICS160', 'MATH132']],
      availability: 'both'
    },
    {
      department: 'CS',
      level: 250,
      level_suffix: null,
      credits: 4,
      prerequisites: [['CICS160', 'MATH132']],
      availability: 'both'
    },
    {
      department: 'CS',
      level: 305,
      level_suffix: null,
      credits: 3,
      prerequisites: [['CS220','CS230','CS240','ENGLWRIT112']],
      availability: 'both'
    },
    {
      department: 'CS',
      level: 311,
      level_suffix: null,
      credits: 4,
      prerequisites: [['CICS210','CS250'],['CICS210','MATH455']],
      availability: 'both'
    },
    
    {
        department: 'CS',
        level: 320,
        level_suffix: null,
        credits: 4,
        prerequisites: [['CS220']],
        availability: 'both'
      },
      {
        department: 'CS',
        level: 325,
        level_suffix: null,
        credits: 3,
        prerequisites: [['CICS210']],
        availability: 'fall'
      },
      {
        department: 'CS',
        level: 326,
        level_suffix: null,
        credits: 4,
        prerequisites: [['CS220'],['CS230']],
        availability: 'both'
      },
      {
        department: 'CS',
        level: 328,
        level_suffix: null,
        credits: 4,
        prerequisites: [['CICS210']],
        availability: 'both'
      },
      {
        department: 'CS',
        level: 335,
        level_suffix: null,
        credits: 3,
        prerequisites: [['CS220'],['CS230']],
        availability: 'fall'
      },
      {
        department: 'CS',
        level: 345,
        level_suffix: null,
        credits: 3,
        prerequisites: [['CICS210']],
        availability: 'both'
      },
      {
        department: 'CS',
        level: 348,
        level_suffix: null,
        credits: 3,
        prerequisites: [['CICS210','CS240','CS250']],
        availability: 'spring'
      },
      {
        department: 'CS',
        level: 360,
        level_suffix: null,
        credits: 3,
        prerequisites: [['CS230']],
        availability: 'both'
      },
      {
        department: 'CS',
        level: 370,
        level_suffix: null,
        credits: 3,
        prerequisites: [['CS240']],
        availability: 'both'
      },
      {
        department: 'CS',
        level: 373,
        level_suffix: null,
        credits: 3,
        prerequisites: [['CICS210']],
        availability: 'both'
      },
      {
        department: 'CS',
        level: 377,
        level_suffix: null,
        credits: 4,
        prerequisites: [['CS230']],
        availability: 'both'
      },
      {
        department: 'CS',
        level: 383,
        level_suffix: null,
        credits: 3,
        prerequisites: [['CICS210','CS240']],
        availability: 'both'
      },
      {
        department: 'CS',
        level: 389,
        level_suffix: null,
        credits: 3,
        prerequisites: [['CS220','CS240','MATH233']],
        availability: 'both'
      },
      {
        department: 'CS',
        level: 403,
        level_suffix: null,
        credits: 3,
        prerequisites: [['CS220','MATH325']],
        availability: 'spring'
      },
      {
        department: 'CS',
        level: 420,
        level_suffix: null,
        credits: 3,
        prerequisites: [['CS320'],['CS326']],
        availability: 'both'
      },
      {
        department: 'CS',
        level: 426,
        level_suffix: null,
        credits: 3,
        prerequisites: [['CS320'],['CS326']],
        availability: 'spring'
      },
      {
        department: 'CS',
        level: 429,
        level_suffix: null,
        credits: 3,
        prerequisites: [['CS320']],
        availability: 'both'
      },
      {
        department: 'CS',
        level: 445,
        level_suffix: null,
        credits: 3,
        prerequisites: [['CS220','CS311','CS345']],
        availability: 'both'
      },
      {
        department: 'CS',
        level: 446,
        level_suffix: null,
        credits: 3,
        prerequisites: [['CS240']],
        availability: 'both'
      },
      {
        department: 'CS',
        level: 453,
        level_suffix: null,
        credits: 3,
        prerequisites: [['CS230']],
        availability: 'both'
      },
      {
        department: 'CS',
        level: 466,
        level_suffix: null,
        credits: 3,
        prerequisites: [['CS311']],
        availability: 'both'
      },
      {
        department: 'CS',
        level: 485,
        level_suffix: null,
        credits: 3,
        prerequisites: [['CS220','CS240']],
        availability: 'fall'
      },
      {
        department: 'CS',
        level: 490,
        level_suffix: 'Q',
        credits: 3,
        prerequisites: [['CS240','MATH235']],
        availability: 'fall'
      },
      {
        department: 'CS',
        level: 491,
        level_suffix: 'G',
        credits: 3,
        prerequisites: [['CS453']],
        availability: 'both'
      },
      {
        department: 'CS',
        level: 501,
        level_suffix: null,
        credits: 3,
        prerequisites: [['CS311']],
        availability: 'spring'
      },
      {
        department: 'CS',
        level: 514,
        level_suffix: null,
        credits: 3,
        prerequisites: [['CS240','CS311']],
        availability: 'spring'
      },
      {
        department: 'CS',
        level: 515,
        level_suffix: null,
        credits: 3,
        prerequisites: [['CS240','CS250']],
        availability: 'fall'
      },
      {
        department: 'CS',
        level: 520,
        level_suffix: null,
        credits: 3,
        prerequisites: [['CS320']],
        availability: 'both'
      },
      {
        department: 'CS',
        level: 528,
        level_suffix: null,
        credits: 3,
        prerequisites: [['CS230','CS240']],
        availability: 'fall'
      },
      {
        department: 'CS',
        level: 532,
        level_suffix: null,
        credits: 3,
        prerequisites: [['CS377','CS445']],
        availability: 'both'
      },
      {
        department: 'CS',
        level: 535,
        level_suffix: null,
        credits: 3,
        prerequisites: [['CS335']],
        availability: 'both'
      },
      {
        department: 'CS',
        level: 546,
        level_suffix: null,
        credits: 3,
        prerequisites: [['CS320','CS383'],['CS320','CS389'],['CS320','CS4469'],['CS320','']],
        availability: 'both'
      },
      {
        department: 'CS',
        level: 550,
        level_suffix: null,
        credits: 3,
        prerequisites: [],
        availability: 'both'
      },
      {
        department: 'CS',
        level: 560,
        level_suffix: null,
        credits: 3,
        prerequisites: [['CS453']],
        availability: 'fall'
      },
      {
        department: 'CS',
        level: 561,
        level_suffix: null,
        credits: 3,
        prerequisites: [['CS360', 'CS453']],
        availability: 'both'
      },
      {
        department: 'CS',
        level: 564,
        level_suffix: null,
        credits: 3,
        prerequisites: [['CS230','CS360']],
        availability: 'both'
      },
      {
        department: 'CS',
        level: 565,
        level_suffix: null,
        credits: 3,
        prerequisites: [['CS365'],['CS377']],
        availability: 'both'
      },
      {
        department: 'CS',
        level: 589,
        level_suffix: null,
        credits: 3,
        prerequisites: [['CS240','MATH545', 'CS235']],
        availability: 'both'
      },
      {
        department: 'CS',
        level: 590,
        level_suffix: 'AB',
        credits: 3,
        prerequisites: [['CS240','MATH235']],
        availability: 'spring'
      },
      {
        department: 'CS',
        level: 590,
        level_suffix: 'AE',
        credits: 3,
        prerequisites: [['CS453']],
        availability: 'spring'
      }
  ]

module.exports = courses