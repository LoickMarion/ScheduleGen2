const csPaths = require('./Database/Courses Javascript/CS Major/requirements.js')
const csCourses = require('./Database/Courses Javascript/CS Major/courses.js')
const mathPaths = require('./Database/Courses Javascript/Math Major/Requirements.js')
const mathCourses = require('./Database/Courses Javascript/Math Major/courses.js')
const {loadPrograms, loadCourses, loadRequirements, requirementToString, printRequirements, getAllCourses} = require('./util.js')

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
                    programs: [program.name],
                    blacklist: reqDetails.blacklist 
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
                              if(!reqDetails.blacklist.includes(combinedName)){
                                if(program.name === 'Applied Math Secondary Major'){
                                  //TODO For some reason CS300+ isn't showing up here
                                  console.log(`Blacklist for ${program.name}'s ${reqName}: ${reqDetails.blacklist}`)
                                }
                                coursesForReq.push(combinedName)
                                criterion.courses.push(combinedName)
                              } else {
                                console.log(`CS311 is on the blacklist for ${program.name}'s ${reqName}: ${reqDetails.blacklist}`)
                              }
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
                requirementMap.get(reqName).programs.push(program.name)
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
          req.blacklist = requirement.blacklist
          remainingReqs.push(req);
        }
      }
    })

    // Add core courses first (courses we are guaranteed to need)
    const selectedCourses = new Set();

    const coreCourses = Array.from(courseToReqs.keys()).filter((course) => {
      return courseToReqs.get(course).some((reqName) => reqName.includes('Core'));
    });

    // If there are any requirements with only 1 criterion of 1 course remaining (ie JYW)
    remainingReqs.forEach((req) => {
      criterion = req.criteria
      if(criterion.length === 1 && criterion[0].courses.length === 1){
        coreCourses.push(criterion[0].courses[0])
      }
    })
    // eliminate requirements knocked out by the core courses.

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
            if (criterion.courses.includes(course) && !req.blacklist.includes(course)) {
              console.log(course + " is being used to satisfy " + req.name + " criterion " + criterion.id);
              req.criteria.splice(i, 1); // Remove the satisfied criterion
              //req.blacklist.push(course)
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
    console.log(selectedCourses)
    return remainingReqs


}

const allPrograms = loadPrograms([csPaths[0], mathPaths[1]])
const allCourses = loadCourses([mathCourses, csCourses])
const allRequirements = loadRequirements([mathPaths[0].allRequirements, csPaths[0].allRequirements])
const minimalCourses = findMinimalCourses(allPrograms, allCourses, allRequirements)
//console.log(minimalCourses)
printRequirements(minimalCourses)