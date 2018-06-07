import React from 'react';
import Book from './Book';

const BookList = ({ books }) => (
  <div className="col-12">
    <ul className="list-inline">
      { books && books.map((item, index) => <li  className="col-2 list-inline-item" key={index}> <Book book={item} /> </li> ) }
  </ul>
</div>
  );

export default BookList;
