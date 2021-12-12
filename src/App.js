import React from 'react'
import { Routes, Route } from 'react-router-dom';
import './App.css'
import * as BooksAPI from './BooksAPI'
import SearchBooks from './SearchBooks.js';
import BookShelves from './BookShelves';

class BooksApp extends React.Component {

  constructor (props) {
    super(props);

    this.shelves = [
      {id: 'currentlyReading', label:'Currently Reading'},
      {id: 'wantToRead', label:'Want to Read'},
      {id: 'read', label:'Read'}
    ];

    this.state = {
      books: []
    }
  }
  componentDidMount () {
    BooksAPI.getAll().then(books => {
        this.setState({
            books: books
        });
    });
  }

  onBookMove = (book, newShelf) => {
    const copyBooks = [...this.state.books];
    const bookFoundOnShelf = copyBooks.filter(b => b.id === book.id);
    let updated = [];
    if (bookFoundOnShelf.length === 1) {
      updated = copyBooks.map(b => b.id === book.id ? {...b, shelf: newShelf} : b);
    } else {
      book['shelf'] = newShelf
      updated = [...copyBooks, book];
    }
    this.setState({ books: updated });
  }

  render() {

    const {books} = this.state;

    return (
      <div className="app">
        <Routes>
          <Route 
            exact path='/'
            element={<BookShelves
              books={books}
              shelves={this.shelves}
              onBookMove={this.onBookMove}
            />}
          />
          <Route
            exact path='/search'
            element={<SearchBooks
              books={books}
              shelves={this.shelves}
              onBookMove={this.onBookMove}
            />}
          />
        </Routes>
      </div>
    )
  }
}

export default BooksApp
