import React from 'react';
import './App.css';
import Course from './Course';

class CourseArea extends React.Component {
  getCourses() {
    let courses = [];

    for(const course of Object.entries(this.props.data)) {
      courses.push (
        <Course key={course[0]} data={course[1]} setCartCourses={(course,section,sub) => this.props.setCartCourses(course,section,sub)}/>
      )
    }

    return courses;
  }

  render() {
    return (
      <div>
        {this.getCourses()}
      </div>
    )
  }
}

export default CourseArea;
