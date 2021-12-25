import React from 'react';
import './App.css';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import SearchAndFilter from './SearchAndFilter';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.searchAndFilter = new SearchAndFilter();
    this.subject = React.createRef();
    this.minimumCredits = React.createRef();
    this.maximumCredits = React.createRef();
    this.search = React.createRef();
    this.state = {
      tags: [],
      checkbox: false
    };
  }

  setCourses() {
    this.props.setCourses(this.searchAndFilter
      .searchAndFilter(this.props.courses, this.state.tags, this.subject.current.value, this.minimumCredits.current.value, this.maximumCredits.current.value, this.state.checkbox));
  }

  setTags() {
    if (this.state.tags.find(tag => tag.toLowerCase() === this.search.current.value.toLowerCase())) {
      this.search.current.value = null;
      return;
    }
    this.setState({ tags: [...this.state.tags, this.search.current.value] }, () => { this.setCourses() });
    this.search.current.value = null;
  }

  removeTag(i) {
    const newTags = [...this.state.tags];
    newTags.splice(i, 1);
    this.setState({ tags: newTags }, () => { this.setCourses() });
  }

  handleCreditsKeyDown(e) {
    if (['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'Backspace', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Tab'].indexOf(e.key) === -1)
      e.preventDefault();
  }

  getSubjectOptions() {
    let subjectOptions = [];

    for (const subject of this.props.subjects) {
      subjectOptions.push(<option key={subject}>{subject}</option>);
    }

    return subjectOptions;
  }

  render() {
    return (
      <>
        <Card style={{ width: 'calc(22vw - 10px)', marginLeft: '30px', marginTop: '10px', position: 'fixed', backgroundColor:"#c9c9c9" }}>
          <Card.Body>
            <Card.Title>Search and Filter</Card.Title>
            <Form>
              <Form.Group controlId="formKeywords" style={{ width: '100%' }} onKeyPress={(e) => {
                if (e.key === 'Enter' && this.search.current.value) {
                  this.setTags()
                }

              }}>
                <Form.Label>Search</Form.Label>
                <Form.Control type="text" placeholder="Search" autoComplete="off" ref={this.search} />
              </Form.Group>
              <Form.Group controlId="formSearchCheck">
                <Form.Check type="checkbox" label="Include all tags" onClick={()=>{this.setState({checkbox: !this.state.checkbox},()=>this.setCourses())}}/>
              </Form.Group>

                {this.state.tags.map((tag, i) => (
                  <Card key={tag} bg='dark' text='white' style={{ overflow: 'hidden' }}>
                    <Row style={{ marginLeft: '5px', wordWrap: 'break-word' }}>
                      {tag}
                      <Button type="button" onClick={() => { this.removeTag(i); }}>x</Button>
                    </Row>
                  </Card>
                ))}
              

              <Form.Group controlId="formSubject">
                <Form.Label>Subject</Form.Label>
                <Form.Control as="select" ref={this.subject} onClick={() => this.setCourses()}>
                  {this.getSubjectOptions()}
                </Form.Control>
              </Form.Group>

              <div style={{ display: 'flex', flexDirection: 'row' }}>
                <Form.Group controlId="minimumCredits" onChange={() => this.setCourses()} onKeyDown={(e) => this.handleCreditsKeyDown(e)}>
                  <Form.Label>Credits</Form.Label>
                  <Form.Control type="text" placeholder="minimum" autoComplete="off" ref={this.minimumCredits} />
                </Form.Group>
                <div style={{ marginLeft: '5px', marginRight: '5px', marginTop: '38px' }}>to</div>
                <Form.Group controlId="maximumCredits" style={{ marginTop: '32px' }} onChange={() => this.setCourses()} onKeyDown={(e) => this.handleCreditsKeyDown(e)}>
                  <Form.Control type="text" placeholder="maximum" autoComplete="off" ref={this.maximumCredits} />
                </Form.Group>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </>
    )
  }
}

export default Sidebar;