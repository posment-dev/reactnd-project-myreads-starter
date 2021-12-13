import React from 'react';
import { Link } from 'react-router-dom';
import BookList from './BookList';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

class BookShelves extends React.Component {

    constructor (props) {
        super(props);

        this.onDragEnd = this.onDragEnd.bind(this);
    }

    onDragEnd = (result) => {

    }
    

    render () {
        const { shelves, onBookMove, books} = this.props;

        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <DragDropContext onDragEnd={this.onDragEnd}>
                    <div className="list-books-content">
                        {shelves.map((shelf, index) => {
                            return (
                                <Droppable droppableId="books" key={shelf.id}>
                                    {(provided, snapshot) => (
                                        <div 
                                            className="bookshelf"
                                            {...provided.droppableProps}
                                            ref={provided.innerRef}
                                        >
                                            <h2 className="bookshelf-title">{shelf.label}</h2>
                                            <div className="bookshelf-books">
                                                <BookList
                                                    books={books.filter(book => book.shelf === shelf.id)}
                                                    shelves={shelves}
                                                    onBookMove={onBookMove}
                                                />
                                            </div>
                                            {provided.placeholder}
                                        </div>
                                    )}
                                </Droppable>
                            )
                        })}
                    </div>
                </DragDropContext>
                <div className="open-search">
                <Link to='/search'>
                    <button className='open-search'>
                        Add a book
                    </button>
                </Link>
              </div>
            </div>
        );
    }


}

export default BookShelves;