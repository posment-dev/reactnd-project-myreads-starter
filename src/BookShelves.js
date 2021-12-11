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
            shelves: [
                {id: 'currentlyReading', label:'Currently Reading'},
                {id: 'wantToRead', label:'Want to Read'},
                {id: 'read', label:'Read'},
            ],
            books: []
        };
    }

    onBookMove = (id, newShelf) => {
        const copyBooks = [...this.state.books];
        const updated = copyBooks.map(b => b.id === id ? {...b, shelf: newShelf} : b);
        this.setState({ books: updated });
    }

    componentDidMount () {
        console.log('mount');
    }

    componentDidUpdate () {
        console.log('update');
        console.log(this.state.books);
    }

    render () {
        const {books , shelves} = this.state;

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
                                <BookList
                                    books={books.filter(book => book.shelf === shelf.id)}
                                    shelves={shelves}
                                    onBookMove={this.onBookMove}
                                />
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