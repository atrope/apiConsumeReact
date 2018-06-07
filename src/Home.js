import React, { Component } from 'react';
import BookList from './BookList';


class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
    };
  }

  componentDidMount() {
    console.log(this.props);
    fetch("https://kindle-book.herokuapp.com/getAll")
    .then(response => response.json())
    .then(data => {
      this.setState({books: data.books})
    })
    .catch(e => console.log('error', e));
  }

  render() {
  return (
    <div>
    <BookList books={this.state.books}/>
    </div>

  )

}
}

export default Home;
