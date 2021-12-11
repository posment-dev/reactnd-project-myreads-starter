import Move from "./Move";

function Book (props) {

    const {book, shelves, onBookMove} = props;

    return (
        <div className="book">
            <div className="book-top">
                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})`}}></div>
                <div className="book-shelf-changer">
                    <Move shelves={shelves} book={book} onBookMove={onBookMove}/>
                </div>
            </div>
            <div className="book-title">{book.title}</div>
            <div className="book-authors">{book.authors !== undefined && book.authors.toString()}</div>
        </div>
    )
}

export default Book;