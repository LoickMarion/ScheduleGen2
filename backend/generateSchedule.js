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
                    reqDetails.criteria.forEach((entry) => {

                    if (entry.courses) {
                        const coursesForReq = reqToCourses.get(reqName) || [];

                        entry.courses.forEach((course) => {
                        const reqsSatisfied = courseToReqs.get(course) ? courseToReqs.get(course) : []
                        if (!reqsSatisfied.includes(reqName)) {
                            reqsSatisfied.push(reqName)
                        }
                        courseToReqs.set(course, reqsSatisfied)

                        if(!coursesForReq.includes(course)){
                          coursesForReq.push(course)
                        }

                        })
                        reqToCourses.set(reqName, coursesForReq)
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
                        console.log(courses)
                        reqToCourses.set(combinedName, )// Need an array of all courses
                    }

                    })
                }
            } 
            //attempt to show that 
            else{
                requirementMap.get(reqName).programs.push(program.programName)
                requirementMap.get(reqName).count.push(req.numReq)
            }
        });
    });


    //make a list of all requirements (no like the object that has criteria, and programs)

    
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
    //Now remove reqs from that list as we add courses to another should be the general idea yea

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
      for(const req of remainingReqs){
        const allCriteria = []
        //check if course can still be used to satisfy that requirement (i.e. not already used for the major)
        if(!programs.includes(req.program) || req.allowsOverlap ){
          //check if the course satisfies the req

            req.criteria.forEach((criterion) => {
              if(criterion.courses){
                allCriteria.push(criterion.courses)
                
              }
            })
          }
          reqToCourses.set(req.name, allCriteria)
        
      }
      console.log(reqToCourses)
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
findMinimalCourses(allPrograms, allCourses, allRequirements)
// console.log(minimalCourses)