import React, { Component } from 'react';
import BookList from './BookList';


class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
    };
    this.deleteBook = this.deleteBook.bind(this);
  }
  componentDidMount() {
    window.addEventListener('deleteBook', this.deleteBook);
    fetch("https://kindle-book.herokuapp.com/getAll")
    .then(response => response.json())
    .then(data => {
      this.setState({books: data.books})
    })
    .catch(e => console.log('error', e));
  }
  componentWillUnmount(){
    window.removeEventListener('deleteBook', this.deleteBook);
  }
  deleteBook(e) {
    var book = e.book;
    var newarr =  this.state.books.filter((element) => element.id !== book.id);
    this.setState({books: newarr})
  }
  render() {
  return (
    <div>
    <BookList books={this.state.books} withLink="true"/>
    </div>

  )

}
}

export default Home;
