import * as BooksAPI from './BooksAPI'

function Move (props) {
    const {shelves, book, onBookMove} = props;

    const onChange = selected => {
        const selectedIndex = selected.target.selectedIndex;
        const newShelf = selectedIndex === 4 ? 'none' : shelves[selectedIndex-1].id;
        BooksAPI.update(book, newShelf);
        onBookMove(book, newShelf);
    };

    const defaultValue = book.hasOwnProperty('shelf') ? book.shelf : 'none'; 

    return (
        <select defaultValue={defaultValue} onChange={onChange}>
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
    );
}

export default Move;