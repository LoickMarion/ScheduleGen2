const csPaths = require('./Database/Courses Javascript/CS Major/Requirements.js')
const csCourses = require('./Database/Courses Javascript/CS Major/courses.js')
// csPaths = require('./Database/Courses Javascript/CS Major/Requirements.js')
//plan:

//start by taking the courses that need to be taken (and ones that user wants to take) and remove all requirements that they satisfy.  necessary classes have 'core' n the req name

//next, look at all requirements that can be satisfed by multiple courses while . This is probably  a reduction of 2 sat/ set cover with 2 sets, so can be done polynomially.

//finally, solve using a greedy algorithm. Priotize taking courses than can be taken asap, meaning a smaller prereq trree level.the ne
// function findMinimalCourses(programs, prerequisiteSets = [], userCourses = []) {

function findMinimalCourses(programs, allCourses) {
    const requirementMap = new Map();  // Maps requirements to their courses
    const courseToReqs = new Map();    // Maps courses to the requirements they satisfy
    const allRequirements = []; // List of all requirements (for bitmasking)

    // Step 1: Flatten all requirements and track the programs and courses satisfying them
    programs.forEach(program => {
        program.requirements.forEach(req => {
            const reqName = req.name;
            if (!requirementMap[reqName]) {
                const reqDetails = program.allRequirements.find(r => r.name === reqName);
                if (reqDetails) {
                    requirementMap.set(reqName,{
                        criteria: reqDetails.criteria,
                        count: req.numReq,
                        logic: reqDetails.logicType,
                        allowsOverlap: reqDetails.allowsOverlap,
                        program: program.program  // Track the program(s) this requirement belongs to
                    });
                    allRequirements.push(reqName); // Track all requirements for bitmasking
                    reqDetails.criteria.forEach((entry) => {
                        if(entry.courses){
                            entry.courses.forEach((course) => {
                                const reqsSatisfied = courseToReqs.get(course) ? courseToReqs.get(course) : []
                                if(!reqsSatisfied.includes(reqName)){
                                    reqsSatisfied.push(reqName)
                                }
                                courseToReqs.set(course,reqsSatisfied)
                            })
                        }
                        else if(entry.minLevel){
                            
                            const courses = getAllCourses(allCourses, entry.department, entry.minLevel)
                            courses.forEach((course) => {
                                const combinedName = course.level_suffix ? course.department + course.level + course.level_suffix : course.department + course.level 

                                const reqsSatisfied = courseToReqs.get(combinedName) ? courseToReqs.get(combinedName) : []
                                if(!reqsSatisfied.includes(reqName)){
                                    reqsSatisfied.push(reqName)
                                }
                                courseToReqs.set(combinedName,reqsSatisfied)
                            })
                        }

                    })
                }
            } else {
                requirementMap[reqName].programs.push(program.name);
            }
        });
    });

    return courseToReqs



    // Step 4: Initialize DP arrays and prepare the states
    const numRequirements = allRequirements.length;
    const targetState = (1 << numRequirements) - 1;  // All requirements satisfied
    const dp = new Array(1 << numRequirements).fill(Infinity);
    dp[0] = 0;  // No requirements satisfied with zero courses

    // Helper function to convert requirement names to bitmask index
    const reqNameToIndex = (reqName) => allRequirements.indexOf(reqName);

    // Step 5: Add core courses first (guaranteed courses)
    let selectedCourses = new Set();
    const satisfiedReqs = {};

    allRequirements.forEach(reqName => {
        if (reqName.includes('Core')) {
            // Collect all courses satisfying "Core" requirements
            const coreCourses = Object.keys(courseToReqs).filter(course => {
                return courseToReqs[course].some(({ reqName: rName }) => rName === reqName);
            });

            coreCourses.forEach(course => selectedCourses.add(course));

            // Update satisfied requirements
            coreCourses.forEach(course => {
                courseToReqs[course].forEach(({ reqName, program }) => {
                    if (!satisfiedReqs[program]) satisfiedReqs[program] = {};
                    satisfiedReqs[program][reqName] = (satisfiedReqs[program][reqName] || 0) + 1;
                });
            });
        }
    });

    // Remove satisfied requirements from the remaining list
    let remainingReqs = {};
    Object.keys(requirementMap).forEach(reqName => {
        if (!reqName.includes('Core')) {
            remainingReqs[reqName] = true;  // Mark as unsatisfied
        }
    });

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

function getAllCourses(courses, department, minLevel){

    return courses.filter((course) => {
        return department === course.department && minLevel <= course.level
    })
}

//a = testMin([csReqs])
a = findMinimalCourses([csPaths[0]], csCourses)
console.log(a)