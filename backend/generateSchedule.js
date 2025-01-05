/*
We make a list of all requirements that need to be satisfied for all majors.

next, we note all the classes that explicitly need to be taken and add these to our class list.

next, we make a list of all classes that the user wants to take (and their necessary prerequisites) and add all of those to a list of classes to take 

next we prioritize courses that can double count and make sure that those are added.

we then remove all the requirements that those classes satisfy from the remaining requirements.

lastly, each prerequisite can best be satisfied by taking a single course from the list of courses that can fill it interatively until all requirements are complete. while this happends we build a schedule
*/
