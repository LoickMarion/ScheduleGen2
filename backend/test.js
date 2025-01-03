/*
CICS 110 -> CICS 160 -> CICS 210 -> CS220/CS230
*/

class Course{
    constructor(courseName, credits, prereqs = [], fall = true, spring = true){
        this.courseName = courseName
        this.prereqs = prereqs
        this.credits = credits
        this.fall = fall
        this.spring = spring
    }
    
    getPrereqs(){
        return this.prereqs.map((e)=>e.courseName)
    }
    
    
    displayCourseInfo(){
        // this.prereqs.length > 0 ? (console.log(`The course ${this.courseName} has the following prerequisites:\n`), this.prereqs.forEach((course) => console.log(course.getPrereqs()))) :             console.log(`The course ${this.courseName} has no prerequisites.`)

        if(this.prereqs.length > 0){
            console.log(`The course ${this.courseName} has the following prerequisites:\n`)
            this.prereqs.forEach((prereqs) => console.log(prereqs.courseName))

        } else {
            console.log(`The course ${this.courseName} has no prerequisites.`)
        }
    }
}


math131 = new Course('MATH131', 4)
math132 = new Course('MATH132', 4, [[math131]])
stats315 = new Course('STATS315', 4, [[math132]])
cics110 = new Course('CICS110', 4)
cics160 = new Course('CICS160', 4, [[cics110]])
cics198c = new Course('CICS198c', 1, [[cics160]])
cics210 = new Course('CICS210', 4, [[cics160]])
cs220 = new Course('CS220', 4, [[cics210]])
cs230 = new Course('CS230', 4, [[cics198c, cics210]])
cs240 = new Course('CS240', 4, [[cics160, math132]])
cs250 = new Course('CS250', 4, [[cics160, math132]])
cs311 = new Course('CS311', 4, [[cs250, cics210]])
cs326 = new Course('CS326', 4, [[cs220], [cs230]])
// cs240.displayCourseInfo()

// Utility function to recursively expand course prerequisites

//courseList: the classes added so far in the iteration
//coursesToAdd: the classes that still need to be processed
//masterList: list to store the finished iteration of each path
const expandUserInputViaPrereqs = (coursesToAdd, masterList, courseList=[]) => {
    while(coursesToAdd.length > 0){
        
        let course = coursesToAdd.shift()
        if (!courseList.includes(course)) {
          courseList.push(course);
        }

        
        if(course.prereqs.length === 0){
            continue
        }
        
        //check if multiple ways to satisfy prereqs
        else if(course.prereqs.length > 1){
          course.prereqs.forEach((prereqList)=>{
            let newCoursesToAdd = coursesToAdd.slice()
            let newCourseList = courseList.slice();
            prereqList.forEach((course) => {
                if (!newCoursesToAdd.includes(course)){
                  console.log(course)
                  newCoursesToAdd.push(course)
                }
              })
            expandUserInputViaPrereqs(newCoursesToAdd, masterList, newCourseList)
          })
          return
        } 
        else {
        //if only one set of prereqs, add them all            
            course.prereqs[0].forEach((prereq) => {
                if (!courseList.includes(prereq)) {
                    coursesToAdd.push(prereq);
                }
            })
        }
    }
    masterList.push(courseList)

}

// expand(courseList = [], coursesToAdd = [311])
/*
[],[326]
[326],[230,198c]
[326,230,160],[ 198c]
*/
masterList = []
expandUserInputViaPrereqs([cs326], masterList)
masterList.forEach((e) => { console.log(e.map((i) => i.courseName))
  })



  // Example coursePrereqs object with dependencies
  const coursePrereqs = {
    'CICS110': [],
    'CICS160': ['CICS110'],
    'CICS210': ['CICS160'],
    'CS220': ['CICS210'],
    'CS230': ['CICS210', 'CICS198c'],
    'CS240': ['CICS160', 'MATH132'],
    'CS250': ['CICS160', 'MATH132'],
    'CS311': ['CICS210', 'CS250']
  };
  
  