const csPaths = require('./Database/Courses Javascript/CS Major/Requirements.js')
const csCourses = require('./Database/Courses Javascript/CS Major/courses.js')
const mathPaths = require('./Database/Courses Javascript/Math Major/Requirements.js')
const mathCourses = require('./Database/Courses Javascript/Math Major/courses.js')
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
        specifics.push(new SpecificRequirement(req.name, req.numReq))
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
 * Given a list of programs and courses, this function returns the optimal courses to take.
 * Optimal here is currently defined as the minimal number of courses to take to satisfy all requirements.
 * 
@param {Array<Program>} allPrograms An array of program objects

@param {Array<Course>} allCourses An array of course objects

@returns {Array<string>} selectedCourses Returns an array of optimal courses
*/
function findMinimalCourses(allPrograms, allCourses, allRequirements) {
  const requirementMap = new Map();  // Maps requirements to their courses
  const courseToReqs = new Map();    // Maps courses to the requirements they satisfy
  const requirementSet = new Set(); // List of all requirements
  // Step 1: Flatten all requirements and track the programs and courses satisfying them
  allPrograms.forEach(program => {
    program.requirements.forEach(req => {
      const reqName = req.name;
      if (!requirementMap[reqName]) {
        const reqDetails = allRequirements.find(r => r.name === reqName);
        if (reqDetails) {
          requirementMap.set(reqName, {
            criteria: reqDetails.criteria,
            count: req.numReq,
            logic: reqDetails.logicType,
            allowsOverlap: reqDetails.allowsOverlap,
            program: program.program
          });
          requirementSet.add(reqName);
          reqDetails.criteria.forEach((entry) => {
            if (entry.courses) {
              entry.courses.forEach((course) => {
                const reqsSatisfied = courseToReqs.get(course) ? courseToReqs.get(course) : []
                if (!reqsSatisfied.includes(reqName)) {
                  reqsSatisfied.push(reqName)
                }
                courseToReqs.set(course, reqsSatisfied)

              })
            }
            if (entry.minLevel) {
              const courses = getAllCourses(allCourses, entry.department, entry.minLevel)
              courses.forEach((course) => {
                const combinedName = course.level_suffix ? course.department + course.level + course.level_suffix : course.department + course.level

                const reqsSatisfied = courseToReqs.get(combinedName) ? courseToReqs.get(combinedName) : []
                if (!reqsSatisfied.includes(reqName)) {
                  reqsSatisfied.push(reqName)
                }
                courseToReqs.set(combinedName, reqsSatisfied)
              })
            }

          })
        }
      } else {
        requirementMap[reqName].programs.push(program.name);
      }
    });
  });

  // Step 2: Add core courses first (courses we are guaranteed to need)
  let selectedCourses = new Set();
  const satisfiedReqs = [];
  const coreCourses = Array.from(courseToReqs.keys()).filter((course) => {
    return courseToReqs.get(course).some((reqName) => reqName.includes('Core'));
  });

  coreCourses.forEach((course) => {
    selectedCourses.add(course)

  })

  requirementSet.forEach(reqName => {
    if (reqName.includes('Core')) {
      // Collect all courses satisfying "Core" requirements

      coreCourses.forEach(course => selectedCourses.add(course));

      // Update satisfied requirements
      coreCourses.forEach(course => {
        courseToReqs.get(course).forEach(({ reqName, program }) => {
          if (!satisfiedReqs[program]) satisfiedReqs[program] = {};
          satisfiedReqs[program][reqName] = (satisfiedReqs[program][reqName] || 0) + 1;
        });
      });
    }
  });

  return requirementSet
}

function getAllCourses(courses, department, minLevel) {
  return courses.filter((course) => {
    return department === course.department && minLevel <= course.level
  })
}

const allPrograms = loadPrograms([csPaths[0], mathPaths[1]])
const allCourses = loadCourses([mathCourses, csCourses])
const allRequirements = loadRequirements([mathPaths[0].allRequirements, csPaths[0].allRequirements])
const minimalCourses = findMinimalCourses(allPrograms, allCourses, allRequirements)

console.log(minimalCourses)