import Move from "./Move";

function Book (props) {

    const {book, shelves, onBookMove} = props;

    const thumbnail = 'imageLinks' in book 
        && 'thumbnail' in book.imageLinks ?
        book.imageLinks.thumbnail: '';
    const title = 'title' in book ? book.title: '';
    const authors = 'authors' in book && book.authors.length > 0? book.authors: '';

    return (
        <div className="book">
            <div className="book-top">
                <div className="book-cover"
                    style={{ width: 128, height: 193, backgroundImage: `url(${thumbnail})`}}
                ></div>
                <div className="book-shelf-changer">
                    <Move shelves={shelves} book={book} onBookMove={onBookMove}/>
                </div>
            </div>
            <div className="book-title">{title}</div>
            <div className="book-authors">{authors.toString()}</div>
        </div>
    )
}

export default Book;