import Book from "./Book";

function BookList (props) {

    const { books, shelves , onBookMove} = props;

    return (
        <div className="bookshelf-books">
                      <ol className="books-grid">
                          {books.map(book => {
                              return (

                                <li key={book.id}>
                                    <Book
                                        book={book}
                                        shelves={shelves}
                                        onBookMove={onBookMove}
                                    />
                                </li>
                              )
                            })
                          }
                      </ol>
                    </div>
    );


}

export default BookList;