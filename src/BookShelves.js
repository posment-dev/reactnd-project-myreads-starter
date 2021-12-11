import React from 'react';
import { Link } from 'react-router-dom';
import BookList from './BookList';
import * as BooksAPI from './BooksAPI'

class BookShelves extends React.Component {

    constructor (props) {
        super(props);

        BooksAPI.getAll().then(books => {
            this.setState({
                books: books
            });
        });
        
        this.state = {
            books: []
        };
    }

    onBookMove = (id, newShelf) => {
        const copyBooks = [...this.state.books];
        const updated = copyBooks.map(b => b.id === id ? {...b, shelf: newShelf} : b);
        this.setState({ books: updated });
    }

    render () {
        const { books } = this.state;
        const { shelves } = this.props;

        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    {shelves.map(shelf => {
                        return (
                            <div className="bookshelf" key={shelf.id}>
                                <h2 className="bookshelf-title">{shelf.label}</h2>
                                <div className="bookshelf-books">
                                    <BookList
                                        books={books.filter(book => book.shelf === shelf.id)}
                                        shelves={shelves}
                                        onBookMove={this.onBookMove}
                                    />
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className="open-search">
                <Link to='/search'>
                    <button className='open-search'>
                        Add a book
                    </button>
                </Link>
              </div>
            </div>
        )
    }


}

export default BookShelves;