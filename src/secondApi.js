import React, { Component } from 'react';
import BookList from './BookList';

class secondApi extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookId:parseInt(props.match.params.bookId, 10),
      books: []
    };
  }
  componentDidMount() {
    let bookId = this.state.bookId;
    fetch(`https://kindle-book.herokuapp.com/getBookByID/${bookId}`)
    .then(response => response.json())
    .then(data => {
      if (data) this.setState({books: [{id: bookId,bookName:data.bookName}]});
    })
    .catch(e => console.log('error', e));
  }
  render() {
  return (
    <div>
    <BookList books={this.state.books} withLink="false"/>
    </div>
  )

}
}

export default secondApi;
