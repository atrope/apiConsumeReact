import React, { Component } from 'react';
import BookList from './BookList';

class thirdApi extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookId:parseInt(props.match.params.bookId, 10),
      category:props.match.params.category,
      books: []
    };
  }
  componentDidMount() {
    let bookId = this.state.bookId;
    let category = this.state.category;

    fetch(`https://kindle-book.herokuapp.com/search/${bookId}/${category}`)
    .then(response => response.json())
    .then(data => {
      if (data) this.setState({books: [{id : bookId,title: category,downloads: data.downloads,bookName: data.bookName,bages: data.bages}]});
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

export default thirdApi;
