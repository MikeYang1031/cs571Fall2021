import React from 'react';
import './App.css';
import RecommendedCourse from './RecommendedCourse';
// import Course from './Course';

class RecommendedCourseArea extends React.Component {

     getCourses() {
          let courses = [];
          for (const course of Object.keys(this.props.data)) {
               courses.push(
                    <RecommendedCourse
                         key={this.props.data[course].name}
                         data={this.props.data[course]} />
               )
          }
          return courses;
     }

     determineRender() {
          let courses = this.getCourses()
          if (courses.length === 0) {
               return (<div style={{ marginLeft: '-20vw', height: "80vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    Recommend base on course you have taken and rated 4 plus 
               </div>
               )
          } else {
               return (<i className={"recommend"} style={{ margin: 5, marginTop: -5 }}>
                    {courses}
               </i>
               )
          }
     }

     render() {
          return (
               <>
               <h5>Recommend base on course you have taken and rated 4 plus</h5>
                    {this.determineRender()}
               </>
          )
     }
}
export default RecommendedCourseArea;