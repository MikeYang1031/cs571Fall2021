import React from 'react';
import './App.css';
import Card from 'react-bootstrap/Card';


class RecommendedCourse extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: -1,
      expanded: false,
    }
    this.handleRating = this.handleRating.bind(this);
  }

  async handleRating(event) {
    await this.setState({ rating: parseInt(event.target.value) });
    this.props.handleCourseRating({ key: this.props.name, courseNum: this.props.courseNumber, rating: this.state.rating, keywords: this.props.keywords })
  }

  getCredits() {
    if (this.props.data.credits === 1) return "1 credit";
    else return this.props.data.credits + " credits";
  }

  getDescription() {
    if (this.state.expanded) {
      return <div>{this.props.data.description}</div>;
    }
  }

  render() {
    return (
      <Card>
        <Card.Body>
            
            <Card.Title>
            <div style={{ maxWidth: 400 }}>{this.props.data.name}</div>
          </Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {this.props.data.number} - {this.getCredits()}
            {this.getDescription()} 
          </Card.Subtitle>
          
            
        </Card.Body>
      </Card>
    )
  }
}


export default RecommendedCourse;