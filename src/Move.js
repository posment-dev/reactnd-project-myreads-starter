import * as BooksAPI from './BooksAPI'

function Move (props) {
    const {shelves, book, onBookMove} = props;

    const onChange = selected => {
        const selectedIndex = selected.target.selectedIndex;
        const newShelf = selectedIndex === 4 ? 'none' : shelves[selectedIndex-1].id;
        console.log(newShelf + ' - ' + typeof newShelf);
        BooksAPI.update(book, newShelf);
        onBookMove(book.id, newShelf);
    };

    return (
        <select defaultValue={book.shelf} onChange={onChange}>
            <option value="move" disabled>Move to...</option>
            {shelves.map(shelf => {
                return (
                    <option 
                        value={shelf.id}
                        key={shelf.id}
                    >{shelf.label}</option>
                )
            })}
            <option value="none">None</option>
        </select>
    )
}

export default Move;