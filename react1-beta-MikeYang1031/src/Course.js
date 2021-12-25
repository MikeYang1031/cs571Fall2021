import React from 'react';
import './App.css';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';

class Course extends React.Component {
  render() {

    const requisites = this.props.data.requisites;

    return (
      <Accordion>
        {this.inCart}
        <Card id={this.props.data.name + this.props.where} style={{ width: "90%", left: "150px", backgroundColor: "#557C50" }}>
          <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey="0" style={{ fontWeight: "bold", color: "white" }}>
              ( {this.props.data.number} )
              {this.props.data.name} |
              ({this.getCredits()} credits)
            </Accordion.Toggle>
            <Button style={{ position: "absolute", right: "5px", backgroundColor: "#1D4121", color: "white" }}
              onClick={() => { this.addToCart(null, null); }}>Add Class</Button>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body style={{ color: "#ccffbf" }}>
              Number: {this.props.data.name} <br></br>
              Credits: {this.props.data.credits} <br></br>
              Discription: {this.props.data.description} <br></br>
              <br></br>
              Sections: <br></br>
              {this.getSections(this.props.data.sections)}
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
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
              <Button style={{ position: "absolute", right: "5px", backgroundColor: "#1D4121", color: "white" }}
                onClick={() => { this.addToCart(str, null); }}>
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
          <p>DIS_ 00{sp} <Button style={{ position: "absolute", right: "5px", backgroundColor: "#1D4121", color: "white" }}
            onClick={() => { this.addToCart(section.toString(), str); }}>Add Subsections</Button></p>
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