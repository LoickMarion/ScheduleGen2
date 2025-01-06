//plan:

//start by taking the courses that need to be taken (and ones that user wants to take) and remove all requirements that they satisfy.  necessary classes have 'core' n the req name

//next, look at all requirements that can be satisfed by multiple courses while . This is probably  a reduction of 2 sat/ set cover with 2 sets, so can be done polynomially.

//finally, solve using a greedy algorithm. Priotize taking courses than can be taken asap, meaning a smaller prereq trree level.the ne

function findMinimalCourses(programs, prerequisiteSets = [], userCourses = []) {
    const requirementMap = {};  // Maps requirements to their courses
    const courseToReqs = {};    // Maps courses to the requirements they satisfy
    const allRequirements = []; // List of all requirements (for bitmasking)
    const prereqs = {};         // Tracks prerequisites for user-specified courses

    // Step 1: Flatten all requirements and track the programs and courses satisfying them
    programs.forEach(program => {
        program.requirements.forEach(req => {
            const reqName = req.name;
            if (!requirementMap[reqName]) {
                const reqDetails = program.allRequirements.find(r => r.requirementName === reqName);
                if (reqDetails) {
                    requirementMap[reqName] = {
                        criteria: reqDetails.criteria,
                        count: req.count,
                        programs: [program.name]  // Track the program(s) this requirement belongs to
                    };
                    allRequirements.push(reqName); // Track all requirements for bitmasking
                }
            } else {
                requirementMap[reqName].programs.push(program.name);
            }
        });
    });

    // Step 2: Map courses to requirements they satisfy
    Object.keys(requirementMap).forEach(reqName => {
        const reqData = requirementMap[reqName];
        reqData.criteria.satisfiedBy.forEach(condition => {
            if (condition.courses) {
                condition.courses.forEach(course => {
                    if (!courseToReqs[course]) courseToReqs[course] = [];
                    reqData.programs.forEach(program => {
                        courseToReqs[course].push({ reqName, program });
                    });
                });
            }
        });
    });

    // Step 3: Track prerequisites for user-specified courses
    userCourses.forEach(course => {
        const reqs = courseToReqs[course];
        reqs.forEach(({ reqName, program }) => {
            // Mark prerequisites of the user-specified course
            if (!prereqs[reqName]) prereqs[reqName] = [];
            prereqs[reqName].push({ course, program });
        });
    });

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

    // Step 6: Add all user-specified courses
    userCourses.forEach(course => {
        selectedCourses.add(course)
        //check to see if they satisfy any requirements. If they do, satisfy them.
    });

    // Step 7: Ensure prerequisites for all sets are satisfied
    prerequisiteSets.forEach(set => {
        set.forEach(course => selectedCourses.add(course)); // Add all courses in the prerequisite set
        //this needs to be changed, as
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