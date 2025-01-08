/**
 * Represents a single specificRequirement 
 */
class SpecificRequirement{
    /**
     * @param {string} name - The name of the specificRequirement.
     * @param {number} numReq - The number of requirements needed to fulfill this specificRequirement.
     */
    constructor(name, numReq){
        this.name = name;
        this.numReq = numReq;
    }
}

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
}

/**
 * Represents an academic program with requirements.
 */
class Program {
    /**
     * Create a program.
     * @param {string} programName - The name of the program (e.g., "CS Major").
     * @param {Array<Object>} requirements - The specific requirements for this program
     */
    constructor(programName = 'N/A', requirements = []) {
        this.programName = programName;
        this.requirements = requirements;
    }
}

/**
 * Represents a course.
 */
class Course {
    /**
     * Create a course.
     * @param {string} department - The name of the course's department
     * @param {number} level - The course's level (e.g., 101, 200, 300)
     * @param {string} level_suffix - The course's level suffix (e.g., "AB", "AF")
     * @param {number} credits - The number of credits the course is worth
     * @param {Array<string>} prerequisites - The prerequisites for the course
     * @param {string} availability - The availability of the course (e.g., "both", "fall", "spring")
     */

    constructor(department, level, level_suffix, credits, prerequisites, availability){
        this.department = department;
        this.level = level;
        this.level_suffix = level_suffix;
        this.credits = credits;
        this.prerequisites = prerequisites;
        this.availability = availability;
    }
}

module.exports = {SpecificRequirement, Requirement, Program, Course };
