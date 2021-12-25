import React from 'react';
import './App.css';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';

class Cart extends React.Component {

  getCourses() {
    let courses = [];
    for (var course in this.props.cart) {
      const coursestr = course.toString()
      courses.push(
        <Card>
          <Card.Body>
            <p>{this.props.cart[course].course.data.number}</p>
            {this.props.cart[course].course.data.name} ({this.props.cart[course].course.data.credits} credits)
            <Button onClick={() => { this.props.removeFromCart(coursestr); }}>Remove</Button>
            //
            <Table>
              <thead>
                <tr>
                  <th>Lecture#</th>
                  <th>Instructor</th>
                  <th>Location</th>
                  <th>Time</th>
                  <th>SubSection</th>
                </tr>
              </thead>
              <tbody>
                {this.getSections(course)}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      )
    }
    return courses;
  }

  getSections(course) {
    let sections = [];

    if (null !== this.props.cart[course].section) {

      const sec = this.props.cart[course].section;
      sections.push(
        <tr key={sec}>
          <td>
            <p>{sec}</p>
            <p><Button onClick={() => { this.props.removeSection(course); }}>Remove</Button></p>
          </td>
          <td> Instructor : {this.props.cart[course].course.data.sections[sec].instructor} </td>
          <td> Location : {this.props.cart[course].course.data.sections[sec].location}</td>
          <td>{this.getTime(course, sec)}</td>
          <td>{this.getSubSec(course, sec)}</td>
        </tr>
      );
    } else {
      for (var section in this.props.cart[course].course.data.sections) {
        const str = section.toString()
        sections.push(
          <tr key={section}>
            <td>
              <p>{section}</p>
              <p>
                <Button onClick={() => { this.addToCart(course, str, null); }}>
                  Add Section
                </Button>
              </p>
            </td>
            <td> Instructor : {this.props.cart[course].course.data.sections[section].instructor} </td>
            <td>{this.getTime(course, section)}</td>
            <td>{this.getSubSec(course, section)}</td>
          </tr>
        );
      }
    }
    return sections;
  }

  getSubSec(course, section) {
    let subsec = [];
    if (null !== this.props.cart[course].sub) {
      const sub = this.props.cart[course].sub
      subsec.push(
        <div key={sub}>
          <p>{sub}<Button onClick={() => { this.props.removeSubsection(course); }}>Remove</Button></p>
          <p>Location: {this.props.cart[course].course.data.sections[section].subsections[sub].location}</p>
          {this.getSubTime(course, section, sub)}
        </div>
      )
    } else {
      for (var sub in this.props.cart[course].course.data.sections[section].subsections) {
        const str = sub.toString();
        subsec.push(
          <div key={sub}>
            <p>{sub}<Button onClick={() => { this.addToCart(course, section, str); }}>Add Subsections</Button></p>
            <p>Location: {this.props.cart[course].course.data.sections[section].subsections[sub].location}</p>
            {this.getSubTime(course, section, sub)}
          </div>
        )
      }
    }
    return subsec;
  }

  getTime(course, section) {
    let time = [];
    for (var day in this.props.cart[course].course.data.sections[section].time) {
      time.push(
        <p key={day}>{day} : {this.props.cart[course].course.data.sections[section].time[day]}</p>
      )
    }
    return time;
  }
  getSubTime(course, section, sub) {
    let time = [];
    for (var day in this.props.cart[course].course.data.sections[section].subsections[sub].time) {
      time.push(
        <p key={day}>{day} : {this.props.cart[course].course.data.sections[section].subsections[sub].time[day]}</p>
      )
    }
    return time;
  }

  addToCart(course, section, subsection) {
    this.props.setCartCourses(this.props.cart[course].course, section, subsection)
  }

  render() {
    return (
      <div>
        {this.getCourses()}
      </div>
    )
  }
}

export default Cart;