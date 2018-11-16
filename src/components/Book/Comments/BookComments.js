import React, { Component } from 'react';
import './BookComments.css';


class BookComments extends Component {
  constructor(props) {
    super(props);

    this.state = { comments: [] };
  }

  componentDidMount() {
    this.setState({ comments: this.props.comments })

  }
  submitReview = (event) => {
    event.preventDefault();
    console.log('What happens when I submit this form?', event.target.review.value);
    this.setState({ comments: [...this.state.comments, { comment: event.target.review.value, name: event.target.name.value }] });
  }


  render() {
    return (
      <div>

        <div className="comments"> Comments </div>
        <hr />
        {this.state.comments && this.state.comments.map(comment => (
          <p className="comment"> {comment.name}: {comment.comment} </p>
        ))
        }
        <form onSubmit={this.submitReview}>
          <p id="nickname">Nickname</p>
          <input id="name-input" type="text" name="name" required />
          <textarea id="review-input" name="review" rows="10" cols="80" required />
          <button id="submit-review" type="submit"> Submit Review </button>
        </form>
      </div>


    );
  }

}

export default BookComments;
