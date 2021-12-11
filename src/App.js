import React from 'react'
import { Routes, Route } from 'react-router-dom';
import './App.css'
import SearchBooks from './SearchBooks.js';
import BookShelves from './BookShelves';

class BooksApp extends React.Component {

  render() {
    return (
      <div className="app">
        <Routes>
          <Route exact path='/' element={<BookShelves />} />
          <Route exact path='/search' element={<SearchBooks />} />
        </Routes>
      </div>
    )
  }
}

export default BooksApp
