import React from 'react';
import Book from './Book';

const BookList = ({ books,withLink }) => (
  <div className="col-12">
    <ul className="list-inline row">
      { books && books.map((item, index) => <li  className="col-2 list-inline-item" key={index}> <Book book={item} withlink={withLink} /> </li> ) }
  </ul>
</div>
);

export default BookList;
