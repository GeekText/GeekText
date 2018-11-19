import React, { Component } from 'react';
import BookComment from './Comments/BookComments';
// import BookReviews from './Comments/BookReviews';
import data from './bookLibrary.json';
import './Book.css';
import BookImg from './ScarletLetter.jpg';
class Book extends Component {
  constructor(props) {
    super(props);
    this.state = { Books: [], reviews: [] };
  }

  componentDidMount() {
    this.setState({ Books: data.books, reviews: data.books[0].reviews })
  }

  submitReview = (event) => {
    event.preventDefault();
    console.log(event.target.value);
    this.setState({ reviews: [...this.state.reviews, +event.target.value] });
  }

  render() {
    console.log('First book:', this.state.Books);
    const firstBook = this.state.Books[0];

    console.log('Value: ', Math.round(this.state.reviews.reduce((accum, curr) => accum + curr, 0) * 100 / this.state.reviews.length) / 100);
    return (
      <div className="book">
        {firstBook ?
          <div>
            <h1> {firstBook.title} </h1>
            <div className="description">
              <img id="book-img" src={BookImg} alt="Book" />
              <div className="book-info">
                <h3> By {firstBook.author} </h3>
                <p> Publisher: {firstBook.publisher} </p>
                <p> ISBN: {firstBook.isbn} </p>
                <p> Overall Rating: {Math.round(this.state.reviews.reduce((accum, curr) => accum + curr, 0) * 100 / this.state.reviews.length) / 100} / 5  </p>
                <i>{this.state.reviews.length} reviews</i>
              </div>
            </div>
            <div className="summary"> Summary:
              <p> {firstBook.summary} </p>
            </div>


            <BookComment comments={firstBook.comments} />
            <div>

              <h2>Star Rating</h2>
              <form>
                <fieldset>
                  <div className="reviews" onChange={this.submitReview}>
                    <span className="star-cb-group">
                      <input type="radio" id="rating-5" name="rating" value="5" /><label htmlFor="rating-5">5</label>
                      <input type="radio" id="rating-4" name="rating" value="4" /><label htmlFor="rating-4">4</label>
                      <input type="radio" id="rating-3" name="rating" value="3" /><label htmlFor="rating-3">3</label>
                      <input type="radio" id="rating-2" name="rating" value="2" /><label htmlFor="rating-2">2</label>
                      <input type="radio" id="rating-1" name="rating" value="1" /><label htmlFor="rating-1">1</label>
                      <input type="radio" id="rating-0" name="rating" value="0" className="star-cb-clear" /><label htmlFor="rating-0">0</label>
                    </span>
                  </div>
                </fieldset>
              </form>


            </div>
          </div >
          :
          null
        }
      </div>

    );
  }
}

export default Book;
