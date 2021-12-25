import React from "react";
import "./App.css";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Sidebar from "./Sidebar";
import CourseArea from "./CourseArea";
import Cart from "./Cart";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allCourses: {},
      filteredCourses: {},
      subjects: [],
      cartCourses:[],
    };
  }

  componentDidMount() {
    fetch("http://cs571.cs.wisc.edu:53706/api/react/classes")
      .then((res) => res.json())
      .then((data) =>
        this.setState({
          allCourses: data,
          filteredCourses: data,
          subjects: this.getSubjects(data),
        })
      );
  }

  getSubjects(data) {
    let subjects = [];
    subjects.push("All");

    for (const course of Object.values(data)) {
      if (subjects.indexOf(course.subject) === -1)
        subjects.push(course.subject);
    }

    return subjects;
  }

  setCourses(courses) {
    this.setState({ filteredCourses: courses });
  }

  setCartCourses(courseA, sectionA, subA){
    for(var course in this.state.cartCourses){
      if(courseA.data.name === this.state.cartCourses[course].course.data.name){
        var tempCart = this.state.cartCourses 
        tempCart[course].section = sectionA;
        tempCart[course].sub = subA;
        this.setState({cartCourses: tempCart})
        return;
      }
    }
    let temp = this.state.cartCourses
    temp.push({
      course: courseA,
      section: sectionA,
      sub: subA
    })
    this.setState({ cartCourses: temp })
  }

  removeFromCart(course){
    const newCart = [...this.state.cartCourses];
    newCart.splice(course,1);
    this.setState({cartCourses: newCart})
  }

  removeSection(course){
    const tempCourse = this.state.cartCourses;
    tempCourse[course].section = null;
    tempCourse[course].sub = null;
    this.setState({cartCourses: tempCourse})
  }

  removeSubsection(course){
    const tempCourse = this.state.cartCourses;
    tempCourse[course].sub = null;
    this.setState({cartCourses: tempCourse})
  }

  render() {
    return (
      <>
        <Tabs
          defaultActiveKey="search"
          style={{
            position: "fixed",
            zIndex: 1,
            width: "100%",
            backgroundColor: "#4f4f4f",
          }}
        >
          <Tab eventKey="search" title="Search" style={{ left:'10px',paddingTop: '5vh', color: "black"}}>
            <Sidebar setCourses={(courses) => this.setCourses(courses)} courses={this.state.allCourses} subjects={this.state.subjects} />
            <div style={{ marginLeft: '20vw' }}>
              <CourseArea data={this.state.filteredCourses} allData={this.state.allCourses} cartMode={false} setCartCourses={(course, section, sub) => this.setCartCourses(course, section, sub)} />
            </div>
          </Tab>

          <Tab eventKey="cart" title="Cart" style={{ paddingTop: '5vh' }}>
            <div style={{ marginLeft: '5vw' }}>
            <Cart cart={this.state.cartCourses}
             removeFromCart={(course) => this.removeFromCart(course)}
             removeSection={(course) => this.removeSection(course)}
             removeSubsection={(course) => this.removeSubsection(course)}
             setCartCourses={(course, section, sub) => this.setCartCourses(course, section, sub)}/>
            </div>
          </Tab>
        </Tabs>
      </>
    );
  }
}

export default App;