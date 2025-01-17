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
/** 
 * Given a list of programs and courses, this function returns the optimal courses to take.
 * Optimal here is currently defined as the minimal number of courses to take to satisfy all requirements.
 * 
@param {Array<Program>} allPrograms An array of program objects

@param {Array<Course>} allCourses An array of course objects

@returns {Array<string>} selectedCourses Returns an array of optimal courses
*/
function findMinimalCourses(allPrograms, allCourses, allRequirements) {
    const requirementMap = new Map();  // Maps requirement name to the requirement object
    const courseToReqs = new Map();    // Maps courses to the requirements they satisfy
    const requirementSet = new Set(); // List of all requirements
    const reqToCourses = new Map();   // Maps reqoop Hell yea maps reqoop (im imagining it "maps re-qoop")
    const remainingReqs = []
    // Step 1: Flatten all requirements and track the programs and courses satisfying them
    allPrograms.forEach(program => {
        program.requirements.forEach(req => {
            const reqName = req.name;
            if (!requirementMap.get(reqName)) {

                const reqDetails = allRequirements.find(r => r.name === reqName);

                if (reqDetails) {

                    requirementMap.set(reqName, {
                    criteria: reqDetails.criteria,
                    count: [req.numReq],
                    logic: reqDetails.logicType,
                    allowsOverlap: reqDetails.allowsOverlap,
                    programs: [program.programName] 
                    });

                    requirementSet.add(reqName);
                    reqDetails.criteria.forEach((criterion) => {

                      const coursesForReq = reqToCourses.get(reqName) || [];

                      criterion.courses.forEach((course) => {
                      const reqsSatisfied = courseToReqs.get(course) ? courseToReqs.get(course) : []

                        if (!reqsSatisfied.includes(reqName)) {
                            reqsSatisfied.push(reqName)
                        }
                        
                        courseToReqs.set(course, reqsSatisfied)

                        if(!coursesForReq.includes(course)){
                          
                          //expand all plus courses (eg CS300+) into their actual possibilities. Adds to coursesForReq and replaces in criterion course lists
                          if(course.charAt(course.length - 1) === '+'){
                            criterion.courses = criterion.courses.filter((element) => element != course)
                            const courseParts = course.match(/[A-Za-z]+|\d+/g)
                            suitableCourses = getAllCourses(allCourses, courseParts[0], courseParts[1])
                            suitableCourses.forEach((suitableCourse => {
                              const combinedName = suitableCourse.level_suffix ? suitableCourse.department + suitableCourse.level + suitableCourse.level_suffix : suitableCourse.department + suitableCourse.level
                              coursesForReq.push(combinedName)
                              criterion.courses.push(combinedName)
                            }))
                            
                          } else {
                            coursesForReq.push(course)
                          }
                        }

                      })
                      reqToCourses.set(reqName, coursesForReq)
                    
                    })
                }
            } 
            else{
                requirementMap.get(reqName).programs.push(program.programName)
                requirementMap.get(reqName).count.push(req.numReq)
            }
        });
    });

    //make a list of all requirements

    Array.from(requirementMap.keys()).forEach((reqName) => {

      const requirement = requirementMap.get(reqName)

      for(let i = 0; i < requirement.count.length; i++){
        for(let j = 1; j <= requirement.count[i]; j++){
          const req = {};
          req.name = reqName;
          req.program = requirement.programs[i];
          req.logic = requirement.logic;
          req.allowsOverlap = requirement.allowsOverlap;
          req.criteria = requirement.criteria;
          remainingReqs.push(req);
        }
      }
    })

    // Step 2: Add core courses first (courses we are guaranteed to need)
    const selectedCourses = new Set();
    const satisfiedReqs = [];

    const coreCourses = Array.from(courseToReqs.keys()).filter((course) => {
      return courseToReqs.get(course).some((reqName) => reqName.includes('Core'));
    });

    // Step 2a: eliminate requirements knocked out by the core courses.

    coreCourses.forEach((course) => {

      const programs = []
      selectedCourses.add(course)

      for (let reqIndex = remainingReqs.length - 1; reqIndex >= 0; reqIndex--) {
        const req = remainingReqs[reqIndex];
      
        // Check if the course can still be used to satisfy that requirement (i.e., not already used for the major )
        //will need to update later to prevent triple counting and handle minors
        if (!programs.includes(req.program) || req.allowsOverlap) {

          // Iterate through criteria and remove satisfied criteria
          for (let i = req.criteria.length - 1; i >= 0; i--) {
            const criterion = req.criteria[i];
            if (criterion.courses.includes(course)) {
              console.log(course + " is being used to satisfy " + req.name + " criterion " + criterion.id);
              req.criteria.splice(i, 1); // Remove the satisfied criterion
            }
          }
      
          // If all criteria are satisfied, remove the requirement from remainingReqs
          if (req.criteria.length === 0) {
            console.log(req.name + " has no more criteria and is being removed.");
            remainingReqs.splice(reqIndex, 1); // Remove the requirement
          }
        }
      }
      
    })
    return remainingReqs

    // Remove satisfied requirements from the remaining list
    Object.keys(requirementMap).forEach(reqName => {
        if (!reqName.includes('Core')) {
            remainingReqs[reqName] = true;  // Mark as unsatisfied
        }
    });

        


    // Step 4: Initialize DP arrays and prepare the states
    const numRequirements = allRequirements.length;
    const targetState = (1 << numRequirements) - 1;  // All requirements satisfied
    const dp = new Array(1 << numRequirements).fill(Infinity);
    dp[0] = 0;  // No requirements satisfied with zero courses

    // Helper function to convert requirement names to bitmask index
    const reqNameToIndex = (reqName) => allRequirements.indexOf(reqName);


    // Step 8: Dynamic Programming for overlapping courses
    // Optimize for courses that count towards multiple requirements
    const courseCounts = {};  // Track how many times each course has been used

    Object.keys(courseToReqs).forEach(course => {
        const courseReqs = courseToReqs[course];
        const newDp = [...dp];  // Copy the current dp array

        courseReqs.forEach(({ reqName, program }) => {
            const reqIdx = reqNameToIndex(reqName);
            const newState = 1 << reqIdx;  // Mark this requirement as satisfied

            // Try all previous states and update dp table
            for (let state = 0; state < (1 << numRequirements); state++) {
                const newStateMask = state | newState;
                // Avoid double-counting courses
                if ((courseCounts[course] || 0) < 2) {
                    newDp[newStateMask] = Math.min(newDp[newStateMask], dp[state] + 1);
                    courseCounts[course] = (courseCounts[course] || 0) + 1;
                }
            }
        });

        dp.splice(0, dp.length, ...newDp);  // Update dp array with new values
    });

    // Step 9: Find the minimum number of courses needed to satisfy all remaining requirements
    const minCourses = dp[targetState];
    if (minCourses === Infinity) {
        throw new Error('Unable to satisfy all requirements.');
    }

    // Return the selected courses
    return Array.from(selectedCourses);
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
// console.log(minimalCourses)
printRequirements(minimalCourses)