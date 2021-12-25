import React from 'react';
import './App.css';
import Section from './Section'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';

class Course extends React.Component {
render() {

  var requisites = this.props.data.requisites;

  return (
    <Card>
      <Card.Body>
        <p>( {this.props.data.number} ) {this.props.data.name} | ({this.getCredits()} credits)</p>
        <Button onClick={() => { this.addToCart(null, null); }}>Add Class</Button>

        <p>Requisites: {this.getRequisite(requisites)}</p>
        <p>Subject: {this.props.data.subject}</p>
        <p>{this.props.data.description}</p>
        <p>keywords: {this.props.data.keywords.join()}</p>
        <p></p>
        <Table>
          <thead>
            <tr>
              <th>Lecture</th>
              <th>Instructor</th>
              <th>Location</th>
              <th>Meeting Times</th>
              <th>SubSections</th>
            </tr>
          </thead>
          <tbody>
            {this.getSections()}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  )
}

getCredits() {
  return this.props.data.credits;
}

getSections() {

  let sections = [];
  for (var sec in this.props.data.sections) {
    const str = sec.toString()
    //hard code ** need improve
    var s = 1;
    var p = 9;
    var sp = s + str - p;
    sections.push(
      <tr key={sec}>
        <td>
          <p>LEC_00{sp}</p>
          <p>
            <Button onClick={() => { this.addToCart(str, null); }}>
              Add Section
            </Button>
          </p>
        </td>
        <td> Instructor : {this.props.data.sections[sec].instructor} </td>
        <td> Location : {this.props.data.sections[sec].location}</td>
        <td>{this.getTime(sec)}</td>
        <td>{this.getSubSec(sec)}</td>
      </tr>
    );
  }
  return sections;
}

getSubSec(section) {
  let subsec = [];
  for (var sub in this.props.data.sections[section].subsections) {
    const str = sub.toString();
    //hard code **
    var s = 1;
    var p = 9;
    var sp = s + str - p;
    subsec.push(
      <div key={sub}>
        <p>DIS_ 00{sp} <Button onClick={() => { this.addToCart(section.toString(), str); }}>Add Subsections</Button></p>
        <p>Location: {this.props.data.sections[section].subsections[sub].location}</p>
        {this.getSubTime(section, sub)}
      </div>
    )
  }
  return subsec;
}

getRequisite(requisites) {
  var length = requisites.length;
  var str = '(';

  if (length === 0) {
    return 'None'
  } else {
    requisites.forEach(ands => {
      var inLength = ands.length;

      ands.forEach(ors => {

        str += (this.props.data.requisites);
        str += --inLength === 0 ? '' : ' OR ';
      })
      str += --length === 0 ? ')' : ') AND (';
    })
  }
  return str
}

getTime(section) {
  let time = [];
  for (var day in this.props.data.sections[section].time) {
    time.push(
      <p key={day}>{day} : {this.props.data.sections[section].time[day]}</p>
    )
  }
  return time;
}
getSubTime(section, sub) {
  let time = [];
  for (var day in this.props.data.sections[section].subsections[sub].time) {
    time.push(
      <p key={day}>{day} : {this.props.data.sections[section].subsections[sub].time[day]}</p>
    )
  }
  return time;
}

addToCart(section, subsection) {
  this.props.setCartCourses(this.props, section, subsection)
}
}

export default Course;
