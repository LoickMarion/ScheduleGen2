const { SpecificRequirement, Requirement, Program, Course } = require('./dataStructures.js')

/**
 * Loads the user's selected programs from the database
 * @param {Array<string>} selectedPrograms - Array of programs user wishes to take
 * @returns {Array<Program>}
 */
function loadPrograms(selectedPrograms) {
  const allPrograms = []
    selectedPrograms.forEach((program) => {
      specifics = []
      program.requirements.forEach((req) => {
        specifics.push(new SpecificRequirement(req.name, req.numReq, program.program))
      })
      allPrograms.push(new Program(program.program, specifics))
    })

  return allPrograms
}

/**
 * Loads all courses from database
 * @param {Array<Object>} courses - Imported courses
 * @returns {Array<Course>}
 */
function loadCourses(courses){
  // Here we would load the courses from database, just importing them for now
  const allCourses = []
  courses.forEach((subject) => {
    subject.forEach((element) => {
      allCourses.push(new Course(element.department, element.level, element.level_suffix, element.credits, element.prerequisites, element.availability))
    })
  })
  return allCourses
}

/**
 * Loads all requirements from database
 * @param {Array<Object>} requirements - Imported requirements
 * @returns {Array<Requirement>}
 */
function loadRequirements(requirements){
  // Here we would load the courses from database, just importing them for now
  const allRequirements = []
  requirements.forEach((requirement) => {
    requirement.forEach((element) => {
      allRequirements.push(new Requirement(element.name, element.logicType, element.allowsOverlap, element.criteria))
    })
  })
  return allRequirements
}


/**
 * 
 * @param {Requirement} requirement 
 * @returns 
 */
function requirementToString(requirement) {
  const { name, program, logic, allowsOverlap, criteria } = requirement;

  // Format criteria
  const formattedCriteria = criteria
    .map((criterion, index) => {
      const courses = criterion.courses ? criterion.courses.join(", ") : "None";
      return `      ${index + 1}. ID: ${criterion.id}, Courses: [${courses}]`;
    })
    .join("\n");

  // Format the entire requirement
  return `
Requirement:
  Name: ${name}
  Program: ${program}
  Logic: ${logic}
  Allows Overlap: ${allowsOverlap ? "Yes" : "No"}
  Criteria:
${formattedCriteria || "      None"}
`;
}


function printRequirements(requirements) {
  console.log(
    requirements.map(req => requirementToString(req)).join("\n======================================\n")
  );
}

function getAllCourses(courses, department, minLevel) {
    return courses.filter((course) => {
      return department === course.department && minLevel <= course.level
    })
  }

module.exports = {loadPrograms, loadCourses, loadRequirements, requirementToString, printRequirements, getAllCourses}