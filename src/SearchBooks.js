import React from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import BookList from './BookList';

class SearchBooks extends React.Component {

  constructor (props) {
    super(props);

    this.state = {
      searchTerm: '',
      booksFound: []
    };
  }

  updateSearch = (event) => {
    const searchTerm = event.target.value;
    BooksAPI.search(searchTerm)
    .then(books => {
      if (books.length > 0) {
        const copyBooks = [...books];
        const mergedBooks = copyBooks.map(b => {
          const bookOnShelf = this.props.books.filter(b2 => b2.id === b.id);
          return bookOnShelf.length === 1 ? bookOnShelf[0] : b;
        });
        this.setState({
          booksFound: mergedBooks,
        });
      } else {
        this.setState({
          booksFound: [],
        })
      }
    })
    .catch(err => {
      console.log('Error searching books:' + err);
      this.setState({
        booksFound: [],
      })
    });
    this.setState({ searchTerm: searchTerm });
  };

  render () {

    const { searchTerm, booksFound } = this.state;
    const { shelves, onBookMove } = this.props;


    return (
        <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to='/'>Close</Link>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input
              type="text"
              placeholder="Search by title or author"
              value={searchTerm}
              onChange={(event => this.updateSearch(event))}
            />

          </div>
        </div>
        <div className="search-books-results">
          <BookList
            books={booksFound}
            shelves={shelves}
            onBookMove={onBookMove}
          />
        </div>
      </div>
    )
  };
}

export default SearchBooks;