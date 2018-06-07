import React from 'react';
import { Link } from 'react-router-dom'

class Book extends React.Component {
  camelCasetoSpaces (word) { //Fix camel case to normal book name so we can search for the cover.
    return word.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => { return str.toUpperCase(); })
  }
  constructor(props) {
    super(props);
    this.state = {
      id : props.book.id,
      category: props.book.title,
      downloads: props.book.downloads,
      name: this.camelCasetoSpaces(props.book.bookName),
      pages: props.book.bages,
      cover:"https://loading.io/spinners/camera/index.svg",
    };
  }
  componentDidMount() { // Search ISBN code and set cover img url
    let query = encodeURI(this.state.name);
    //let key = "AIzaSyBXDIDyXKzxZ9xwJXc5iJCUmSmFTszQR4k";
    //let url = `https://www.googleapis.com/books/v1/volumes?q=${query}&key=${key}`;
    let url = `https://www.googleapis.com/books/v1/volumes?q=${query}`;
    console.log(url);
    fetch(url)
    .then(response => response.json())
    .then(data => {
      let info = data.items[0].volumeInfo;
      this.setState({cover: info.imageLinks.thumbnail})
    })
    .catch(e => {
      this.setState({cover: "https://islandpress.org/sites/default/files/400px%20x%20600px-r01BookNotPictured.jpg"})
      //console.log('error', e)
    });
  }
  render() {
    return <Link to={`/book/${this.state.id}`}><div className="card pointer" data-id={this.state.id}>

          <img className="card-img-top" src={ this.state.cover } alt="{`Cover of book ${this.state.name}`}" />
  <div className="card-body">
    <h5 className="card-title text-dark">{this.state.name}</h5>
    <button className="btn btn-primary">Go to book</button>
  </div>
</div></Link>
  }
}

//{id: "1", title: "Action", downloads: "200", bookName: "superMan", bages: "500"}
//
export default Book;
