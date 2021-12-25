import React from 'react';
import './App.css';
import Card from 'react-bootstrap/Card';

class PreviousCourse extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: 0,
      expanded: false,
    }
    this.handleRating = this.handleRating.bind(this);
  }

  async handleRating(event) {
    console.log(this.state.rating)
    if (this.state.rating === parseInt(event.target.value)) {
      await this.setState({ rating: -1 });

    } else {
      await this.setState({ rating: parseInt(event.target.value) });
    }


    this.props.handleCourseRating({ courseNum: this.props.courseNumber, name: this.props.data.name, keywords: this.props.data.keywords, rating: this.state.rating, })
  }
  //made this check box from an example W3school
  render() {
    return (
      <Card style={{ width: "30%", marginTop: '10px', marginBottom: '10px' }}>
        <Card.Body>
          <Card.Title>
            <div>
              {this.props.data.name}
            </div>

          </Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{this.props.data.number}</Card.Subtitle>

          <ul data-tip data-for="ratingTip">
            <li>
            <div class="bg-danger p-2 text-white">
            <label> 1(lowest)
                <input
                  type="checkbox"
                  value="1"
                  checked={this.state.rating === 1}
                  onChange={this.handleRating} />
              </label>
              </div>
            </li>
            <li>
            <div class="bg-danger p-2 text-white  bg-opacity-75">
              <label> 2
                <input
                  type="checkbox"
                  value="2"
                  checked={this.state.rating === 2}
                  onChange={this.handleRating} />
              </label>
              </div>
            </li>
            <li>
            <div class="p-2 bg-secondary text-white">
              <label> 3
                <input
                  type="checkbox"
                  value="3"
                  checked={this.state.rating === 3}
                  onChange={this.handleRating} />
              </label>
              </div>
            </li>
            <li>
            <div class="bg-success p-2 text-white bg-opacity-75">
              <label> 4
                <input
                  type="checkbox"
                  value="4"
                  checked={this.state.rating === 4}
                  onChange={this.handleRating} />
              </label>
              </div>
            </li>
            <li>
            <div class="bg-success p-2 text-white">
              <label> 5(Highest)
                <input
                  type="checkbox"
                  value="5"
                  checked={this.state.rating === 5}
                  onChange={this.handleRating} />
              </label>
              </div>
            </li>
          </ul>
        </Card.Body>
      </Card>
    )
  }
}
export default PreviousCourse;