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
      showButton: props.withlink === "true",
      editing: false
    };
    else
    this.state = {
      id : props.book.id,
      name: this.camelCasetoSpaces(props.book.bookName),
      pages:-1,
      cover:"https://loading.io/spinners/camera/index.svg",
      showButton: props.withlink === "true",
      editing: false
    };
    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.renderForm = this.renderForm.bind(this);
    this.renderUI = this.renderUI.bind(this);
    this.handleChange = this.handleChange.bind(this);

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
  handleDelete(e){
    var evt = document.createEvent("Events")
    evt.initEvent("deleteBook", true, true);
    evt.book = this.state;
    window.dispatchEvent(evt);
  }
  handleEdit(e){
    this.setState({editing: true});
  }
  handleSave(e){
    e.preventDefault();
    this.setState({editing: false});
  }
  handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({[name]: value});
  }


    renderForm() {
      return (
            <div className="card pointer" data-id={this.state.id}>
            <img className="card-img-top" src={ this.state.cover } alt={`Cover of book ${this.state.name}`} />
              <div className="card-body">
                <form onSubmit={this.handleSave}>
                <input value={this.state.name} name="name"  onChange={this.handleChange}/>
                  <input value={this.state.downloads} name="downloads"  onChange={this.handleChange}/>
                    <input value={this.state.category} name="category"  onChange={this.handleChange}/>
                      <input value={this.state.pages} name="pages"  onChange={this.handleChange}/>
                        <button className="btn btn-primary mt-3 mr-1" type="submit">Save</button>

                    </form>

              </div>
            </div>
          );
    }

    //render to send to user interface
    renderUI() {
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
    else return (
          <div className="card pointer" data-id={this.state.id}>
            <Link to={`/book/${this.state.id}/${this.state.category}`}>
          <img className="card-img-top" src={ this.state.cover } alt={`Cover of book ${this.state.name}`} /></Link>
            <div className="card-body">
            <Link to={`/book/${this.state.id}/${this.state.category}`}>
              <h5 className="card-title text-dark">{this.state.name}</h5>
                <span className="card-title text-dark">
                  Downloads: {this.state.downloads}<br/>
                Category: {this.state.category}<br/>
                  Pages: {this.state.pages}<br/>
                </span></Link>
              <Link to={`/book/${this.state.id}/${this.state.category}`}><button className="btn btn-primary mt-3 mr-1">Go to book</button></Link>
                  <button className="btn btn-primary mt-3 mr-1" onClick={ this.handleDelete }>Delete</button>
                    <button className="btn btn-primary mt-3 mr-1" onClick={ this.handleEdit }>Edit</button>
            </div>
          </div>
        );
    }


  render() {
    return this.state.editing ? this.renderForm() : this.renderUI();
  }
}
export default Book;
