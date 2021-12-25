import React from 'react';
import './App.css';
import PreviousCourse from './PreviousCourse';

class PreviousCourseArea extends React.Component {

     getCourses() {
          let courses = [];
          for (const course of Object.keys(this.props.data)) {
               courses.push(
                    <PreviousCourse 
                    key={this.props.data[course].number} 
                    data={this.props.data[course]} 
                    courseNumber={this.props.data[course].number} 
                    handleCourseRating={(prevCourse) => this.props.handleCourseRating(prevCourse)} 
                    keywords={this.props.data.keywords} />
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
export default PreviousCourseArea;