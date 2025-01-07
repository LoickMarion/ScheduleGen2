/**
 * Represents a single requirement for a program.
 */
class Requirement {
    /**
     * @param {string} name - The name of the requirement.
     * @param {string} logicType - The type of logic applied to the requirement (e.g., "Course-Based").
     * @param {boolean} allowsOverlap - Whether this requirement can overlap with others.
     * @param {Array<Object>} criteria - The criteria for fulfilling the requirement.
     */
    constructor(name, logicType, allowsOverlap, criteria) {
        this.name = name;
        this.logicType = logicType;
        this.allowsOverlap = allowsOverlap;
        this.criteria = criteria;
    }

    getName(){
        return this.name
    }

    getLogicType(){
        return this.logicType
    }

    getAllowsOverlap(){
        return this.allowsOverlap
    }

    getCriteria(){
        return this.criteria
    }
}

/**
 * Represents an academic program with requirements.
 */
class Program {
    /**
     * Create a program.
     * @param {string} programName - The name of the program (e.g., "CS Major").
     * @param {Array<Requirement>} allRequirements - All possible requirements for the program.
     * @param {Array<Object>} specificRequirements - The specific requirements for this program.
     */
    constructor(programName, allRequirements, specificRequirements) {
        this.programName = programName;
        this.allRequirements = allRequirements;
        this.specificRequirements = specificRequirements;
    }
}

const csRequirements = [
    new Requirement(
        'CS Major Core Classes',
        'Course-Based',
        false,
        [{ courses: ['CICS110', 'CICS160', 'CICS210', 'CS220', 'CS230', 'CS240', 'CS250', 'CS311', 'MATH131', 'MATH132', 'MATH233', 'MATH235'] }]
    ),
    new Requirement(
        'CS Minor Core Classes',
        'Course-Based',
        false,
        [{ courses: ['CICS110', 'CICS160', 'CICS210'] }]
    ),
    new Requirement(
        'CS JYW',
        'Course-Based',
        false,
        [{ courses: ['CS305'] }]
    ),
    new Requirement(
        'CS IE',
        'Course-Based',
        true,
        [
            { courses: ['CS320'] },
            { courses: ['CS326'] }
        ]
    ),
    new Requirement(
        'CS300+',
        'Course-Based',
        false,
        [{ department: 'CS', minLevel: 300 }]
    ),
    new Requirement(
        'CS300++',
        'Course-Based',
        false,
        [
            { department: 'CS', minLevel: 300 },
            { courses: ['MATH411'] },
            { courses: ['MATH545', 'MATH551', 'MATH552'] },
            { courses: ['LINGUIST301'] },
            { courses: ['ECE547', 'ECE668'] }
        ]
    ),
    new Requirement(
        'CS400+',
        'Course-Based',
        false,
        [{ department: 'CS', minLevel: 400 }]
    ),
    new Requirement(
        'CS500+',
        'Course-Based',
        false,
        [{ department: 'CS', minLevel: 500 }]
    ),
    new Requirement(
        'CS200Level',
        'Course-Based',
        false,
        [
            { courses: ['CS220'] },
            { courses: ['CS230'] },
            { courses: ['CS240'] },
            { courses: ['CS250'] }
        ]
    ),
    new Requirement(
        'CSLabScience',
        'Course-Based',
        false,
        [
            { courses: ['CICS256'] },
            { courses: ['CHEM111', 'CHEM112', 'CHEM121', 'CHEM122'] },
            { courses: ['GEOL101', 'GEOL103', 'GEOL131'] },
            { courses: ['PHYSICS151', 'PHYSICS181'] },
            { courses: ['PHYSICS152', 'PHYSICS182'] }
        ]
    )
];

const csPrograms = [
    new Program(
        'CS Primary Major',
        csRequirements,
        [
            { name: 'CS Major Core Classes', numReq: 1 },
            { name: 'CS JYW', numReq: 1 },
            { name: 'CS IE', numReq: 1 },
            { name: 'CS300+', numReq: 3 },
            { name: 'CS300++', numReq: 1 },
            { name: 'CS400+', numReq: 3 },
            { name: 'CSLabScience', numReq: 2 }
        ]
    ),
    new Program(
        'CS Secondary Major',
        csRequirements,
        [
            { name: 'CS Major Core Classes', numReq: 1 },
            { name: 'CS300+', numReq: 3 },
            { name: 'CS300++', numReq: 1 },
            { name: 'CS400+', numReq: 3 },
            { name: 'CSLabScience', numReq: 2 }
        ]
    ),
    new Program(
        'CS Minor',
        csRequirements,
        [
            { name: 'CS Minor Core Classes', numReq: 1 },
            { name: 'CS200Level', numReq: 2 },
            { name: 'CS300+', numReq: 1 }
        ]
    ),
    new Program(
        'CS 4+1',
        csRequirements,
        [
            { name: 'CS Major Core Classes', numReq: 1 },
            { name: 'CS JYW', numReq: 1 },
            { name: 'CS IE', numReq: 1 },
            { name: 'CS300+', numReq: 3 },
            { name: 'CS300++', numReq: 1 },
            { name: 'CS400+', numReq: 1 },
            { name: 'CS500+', numReq: 4 },
            { name: 'CSLabScience', numReq: 2 }
        ]
    )
];

module.exports = {csRequirements, csPrograms };
