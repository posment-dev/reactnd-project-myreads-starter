import React from 'react'
import { Routes, Route } from 'react-router-dom';
import './App.css'
import SearchBooks from './SearchBooks.js';
import BookShelves from './BookShelves';

class BooksApp extends React.Component {

  constructor (props) {
    super(props);

    this.state = {
      shelves: [
        {id: 'currentlyReading', label:'Currently Reading'},
        {id: 'wantToRead', label:'Want to Read'},
        {id: 'read', label:'Read'},
      ]
    }
  }


  render() {
    return (
      <div className="app">
        <Routes>
          <Route exact path='/' element={<BookShelves shelves={this.state.shelves}/>} />
          <Route exact path='/search' element={<SearchBooks shelves={this.state.shelves}/>} />
        </Routes>
      </div>
    )
  }
}

export default BooksApp
