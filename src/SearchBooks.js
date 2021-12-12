import React from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import BookList from './BookList';

class SearchBooks extends React.Component {

  constructor (props) {
    super(props);

    this.state = {
      searchTerm: ''
    };
  }

  updateSearch = (event) => {
    const searchTerm = event.target.value;
    this.props.onSearch(BooksAPI.search(searchTerm));
    this.setState({ searchTerm: searchTerm });
  };

  render () {

    const { searchTerm } = this.state;
    const { shelves, onBookMove, books, onGoToHome } = this.props;


    return (
        <div className="search-books">
        <div className="search-books-bar">
          <Link to='/'>
            <button className="close-search" onClick={onGoToHome}>Close</button>
          </Link>
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
            books={books}
            shelves={shelves}
            onBookMove={onBookMove}
          />
        </div>
      </div>
    )
  };
}

export default SearchBooks;