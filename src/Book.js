import React from 'react';
import { Link } from 'react-router-dom'

class Book extends React.Component {
  camelCasetoSpaces (word) { //Fix camel case to normal book name so we can search for the cover.
    return word.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => { return str.toUpperCase(); })
  }
  constructor(props) {
    super(props);
    if (props.book.title)
    this.state = {
      id : props.book.id,
      category: props.book.title,
      downloads: props.book.downloads,
      name: this.camelCasetoSpaces(props.book.bookName),
      pages: props.book.bages,
      cover:"https://loading.io/spinners/camera/index.svg",
      showButton: props.withlink === "true"
    };
    else
    this.state = {
      id : props.book.id,
      name: this.camelCasetoSpaces(props.book.bookName),
      pages:-1,
      cover:"https://loading.io/spinners/camera/index.svg",
      showButton: props.withlink === "true"
    };
  }
  componentDidMount() { // Search ISBN code and set cover img url
    let query = encodeURI(this.state.name);
    let url = `https://www.googleapis.com/books/v1/volumes?q=${query}`;
    fetch(url)
    .then(response => response.json())
    .then(data => {
      let info = data.items[0].volumeInfo;
      this.setState({cover: info.imageLinks.thumbnail})
    })
    .catch(e => {
      this.setState({cover: "https://islandpress.org/sites/default/files/400px%20x%20600px-r01BookNotPictured.jpg"})
    });
  }
  render() {
    if (this.state.pages===-1)
    return (<div className="card pointer" data-id={this.state.id}>
     <img className="card-img-top" src={ this.state.cover } alt={`Cover of book ${this.state.name}`} />
        <div className="card-body">
          <h5 className="card-title text-dark">{this.state.name}</h5>
        </div>
      </div>);
    else  if (!this.state.showButton)
    return (<div className="card pointer" data-id={this.state.id}>
          <img className="card-img-top" src={ this.state.cover } alt={`Cover of book ${this.state.name}`} />
            <div className="card-body">
              <h5 className="card-title text-dark">{this.state.name}</h5>
                <span className="card-title text-dark">
                  Downloads: {this.state.downloads}<br/>
                Category: {this.state.category}<br/>
                  Pages: {this.state.pages}<br/>
                </span>
              </div>
          </div>);
    else return (<Link to={`/book/${this.state.id}/${this.state.category}`}>
          <div className="card pointer" data-id={this.state.id}>
          <img className="card-img-top" src={ this.state.cover } alt={`Cover of book ${this.state.name}`} />
            <div className="card-body">
              <h5 className="card-title text-dark">{this.state.name}</h5>
                <span className="card-title text-dark">
                  Downloads: {this.state.downloads}<br/>
                Category: {this.state.category}<br/>
                  Pages: {this.state.pages}<br/>
                </span>
              <button className="btn btn-primary mt-3">Go to book</button>
            </div>
          </div>
        </Link>);

  }
}
export default Book;
