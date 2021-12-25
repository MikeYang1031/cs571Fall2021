class SearchAndFilter {
  searchAndFilter(courses, search, subject, minimumCredits, maximumCredits, checked) {
    
    //only display courses that match the selected subject
    if (subject !== 'All') {
      let coursesAfterSubject = [];

      for (const course of Object.values(courses)) {
        if (course.subject === subject)
          coursesAfterSubject.push(course)
      }
      courses = coursesAfterSubject;
    }
    
    //only display courses that have an amount of credits within the selected credit range
    if (minimumCredits !== '') {
      let coursesAfterMinimumCredits = [];

      for (const course of Object.values(courses)) {
        if (course.credits >= parseInt(minimumCredits))
          coursesAfterMinimumCredits.push(course);
      }
      courses = coursesAfterMinimumCredits;
    }

    if (maximumCredits !== '') {
      let coursesAfterMaximumCredits = [];

      for (const course of Object.values(courses)) {
        if (course.credits <= parseInt(maximumCredits))
          coursesAfterMaximumCredits.push(course);
      }
      courses = coursesAfterMaximumCredits;
    }

    // only display courses that have a keyword that contains (or is) the user input from the search bar.
    if (search.length !== 0) {
      let coursesAfterSearch = [];
      for (const course of Object.values(courses)) {
        for (const keyword of course.keywords) {
          for (const tag of search) {
            if (keyword.includes(tag)) {
              if (!coursesAfterSearch.includes(course)) {
                coursesAfterSearch.push(course);
                break;
              }
            }
          }
        }
      }
      courses = coursesAfterSearch;

      if (checked && coursesAfterSearch.length !== 0) {
        let checkedCourses = [];
        for (const searched of Object.values(coursesAfterSearch)) {
          var intersect = 0;
          for (const tag of search) {
            for(const keyword of searched.keywords){
              if(keyword.includes(tag)){
                intersect++;
                break;
              }
            }
          }
          if(intersect === search.length){
            checkedCourses.push(searched);
          }
        }
        courses = checkedCourses;
      }
    }
    return courses;
  }
}
export default SearchAndFilter;