const mathCourses = [
    {
      department: 'MATH',
      level: 131,
      level_suffix: null,
      credits: 4,
      prerequisites: [],
      availability: 'both'
    },
    {
      department: 'MATH',
      level: 132,
      level_suffix: null,
      credits: 4,
      prerequisites: [['MATH131']],
      availability: 'both'
    },
    {
      department: 'MATH',
      level: 233,
      level_suffix: null,
      credits: 4,
      prerequisites: [['MATH132']],
      availability: 'both'
    },
    {
      department: 'MATH',
      level: 235,
      level_suffix: null,
      credits: 3,
      prerequisites: [['MATH132']],
      availability: 'both'
    },
    {
      department: 'MATH',
      level: 300,
      level_suffix: null,
      credits: 3,
      prerequisites: [['MATH132']],
      availability: 'both'
    },
    {
        department: 'MATH',
        level: 370,
        level_suffix: null,
        credits: 3,
        prerequisites: [['MATH300'],['CS250']],
        availability: 'both'
      },
    {
      department: 'MATH',
      level: 331,
      level_suffix: null,
      credits: 3,
      prerequisites: [['MATH132']],
      availability: 'both'
    },  {
        department: 'MATH',
        level: 405,
        level_suffix: null,
        credits: 3,
        prerequisites: [['MATH235','CS250'],['CICS110', 'MATH235','MATH300']],
        availability: 'fall'
      },
      {
        department: 'MATH',
        level: 411,
        level_suffix: null,
        credits: 3,
        prerequisites: [['MATH235','CS250'],['MATH235','MATH300']],
        availability: 'both'
      },
      {
        department: 'MATH',
        level: 412,
        level_suffix: null,
        credits: 3,
        prerequisites: [['MATH411']],
        availability: 'spring'
      },
      {
        department: 'MATH',
        level: 421,
        level_suffix: null,
        credits: 3,
        prerequisites: [['MATH233']],
        availability: 'both'
      },
      {
        department: 'MATH',
        level: 437,
        level_suffix: null,
        credits: 3,
        prerequisites: [['MATH132']],
        availability: 'both'
      },
      {
        department: 'MATH',
        level: 455,
        level_suffix: null,
        credits: 3,
        prerequisites: [['MATH235','CS250'],['MATH235','MATH300']],
        availability: 'both'
      },
      {
        department: 'MATH',
        level: 456,
        level_suffix: null,
        credits: 3,
        prerequisites: [['MATH233','MATH235']],
        availability: 'both'
      },
      {
        department: 'MATH',
        level: 461,
        level_suffix: null,
        credits: 3,
        prerequisites: [['MATH235','CS250'],['MATH235','MATH300']],
        availability: 'both'
      },
      {
        department: 'MATH',
        level: 471,
        level_suffix: null,
        credits: 3,
        prerequisites: [['MATH233','MATH235','CS250'],['MATH233','MATH235','MATH300']],
        availability: 'fall'
      },
      {
        department: 'MATH',
        level: 475,
        level_suffix: null,
        credits: 3,
        prerequisites: [['MATH233','CS250'],['MATH233','MATH300']],
        availability: 'spring'
      },
      {
        department: 'MATH',
        level: 481,
        level_suffix: null,
        credits: 3,
        prerequisites: [['MATH235','CS250'],['MATH235','MATH300']],
        availability: 'fall'
      },
      {
        department: 'MATH',
        level: 522,
        level_suffix: null,
        credits: 3,
        prerequisites: [['MATH235','MATH331','CS250'],['MATH235','MATH331','MATH300']],
        availability: 'spring'
      },
      {
        department: 'MATH',
        level: 523,
        level_suffix: 'H',
        credits: 3,
        prerequisites: [['CS250'],['MATH300']],
        availability: 'both'
      },
      {
        department: 'MATH',
        level: 524,
        level_suffix: null,
        credits: 3,
        prerequisites: [['MATH523H']],
        availability: 'spring'
      },
      {
        department: 'MATH',
        level: 532,
        level_suffix: 'H',
        credits: 3,
        prerequisites: [['MATH233','MATH235','MATH331']],
        availability: 'fall'
      },
      {
        department: 'MATH',
        level: 534,
        level_suffix: 'H',
        credits: 3,
        prerequisites: [['MATH233','MATH235','MATH331']],
        availability: 'spring'
      },
      {
        department: 'MATH',
        level: 536,
        level_suffix: null,
        credits: 3,
        prerequisites: [['MATH233','STAT315']],
        availability: 'spring'
      },
      {
        department: 'MATH',
        level: 537,
        level_suffix: null,
        credits: 3,
        prerequisites: [['MATH233','STAT315']],
        availability: 'both'
      },
      {
        department: 'MATH',
        level: 545,
        level_suffix: null,
        credits: 3,
        prerequisites: [['MATH233','MATH235','CS250'],['MATH233','MATH235','MATH300']],
        availability: 'both'
      },
      {
        department: 'MATH',
        level: 548,
        level_suffix: null,
        credits: 3,
        prerequisites: [['STAT315']],
        availability: 'both'
      },
      {
        department: 'MATH',
        level: 551,
        level_suffix: null,
        credits: 3,
        prerequisites: [['MATH233','MATH235','CICS110']],
        availability: 'both'
      },
      {
        department: 'MATH',
        level: 552,
        level_suffix: null,
        credits: 3,
        prerequisites: [['MATH551']],
        availability: 'spring'
      },
      {
        department: 'MATH',
        level: 563,
        level_suffix: 'H',
        credits: 3,
        prerequisites: [['MATH233','MATH235']],
        availability: 'spring'
      },

      {
        department: 'MATH',
        level: 590,
        level_suffix: 'STA',
        credits: 3,
        prerequisites: [['MATH233','STAT315'],['MATH233','MATH545']],
        availability: 'both'
      },
      {
        department: 'STAT',
        level: 315,
        level_suffix: null,
        credits: 3,
        prerequisites: [],
        availability: 'both'
      },
      {
        department: 'STAT',
        level: 516,
        level_suffix: null,
        credits: 3,
        prerequisites: [['STAT315']],
        availability: 'both'
      },
      {
        department: 'STAT',
        level: 525,
        level_suffix: null,
        credits: 3,
        prerequisites: [['STAT516']],
        availability: 'both'
      },
      {
        department: 'STAT',
        level: 526,
        level_suffix: null,
        credits: 3,
        prerequisites: [['STAT516']],
        availability: 'both'
      },
      {
        department: 'STAT',
        level: 530,
        level_suffix: null,
        credits: 3,
        prerequisites: [['STAT525']],
        availability: 'both'
      },
      {
        department: 'STAT',
        level: 535,
        level_suffix: null,
        credits: 3,
        prerequisites: [['CICS110','STAT516']],
        availability: 'both'
      }
  ]
  module.exports = mathCourses