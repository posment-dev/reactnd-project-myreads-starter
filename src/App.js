import React from 'react'
import { Routes, Route } from 'react-router-dom';
import './App.css'
import * as BooksAPI from './BooksAPI'
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
      ],
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

  onNavigateToHome = () => {
    this.setState({ books: [] })
    BooksAPI.getAll().then(books => {
      this.setState({
          books: books
      });
  });
  }

  onNavigateToSearch = () => {
    this.setState({ books: [] })
  }

  onBookMove = (id, newShelf) => {
    const copyBooks = [...this.state.books];
    const updated = copyBooks.map(b => b.id === id ? {...b, shelf: newShelf} : b);
    this.setState({ books: updated });
  }

  onSearch = (queryResult) => {
    queryResult
    .then(books => {
      if (books.length > 0) {
        this.setState({
          books: books,
        })
      } else {
        this.setState({
          books: [],
        })
      }
    })
    .catch(err => {
      console.log('Error searching books:' + err);
      this.setState({
        books: [],
      })
    });
  }


  render() {

    const {books, shelves} = this.state;

    return (
      <div className="app">
        <Routes>
          <Route 
            exact path='/'
            element={<BookShelves
              books={books}
              shelves={shelves}
              onBookMove={this.onBookMove}
              onGoToSearch={this.onNavigateToSearch}
            />}
          />
          <Route
            exact path='/search'
            element={<SearchBooks
              books={books}
              shelves={shelves}
              onBookMove={this.onBookMove}
              onSearch={this.onSearch}
              onGoToHome={this.onNavigateToHome}
            />}
          />
        </Routes>
      </div>
    )
  }
}

export default BooksApp
