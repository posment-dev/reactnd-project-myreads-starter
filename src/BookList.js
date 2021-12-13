import Book from "./Book";
import { Draggable } from "react-beautiful-dnd";

function BookList (props) {

    const { books, shelves , onBookMove} = props;

    return (
        
        <ol className="books-grid">
            {books.map((book, index) => {
                return (
                    <Draggable
                        key={book.id}
                        draggableId={book.id}
                        index={index}
                    >
                        {(provided) => (
                            <li
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                            >
                                <Book
                                    book={book}
                                    shelves={shelves}
                                    onBookMove={onBookMove}
                                />
                            </li>
                        )}
                    </Draggable>
                )
            })
            }
        </ol>
    );


}

export default BookList;