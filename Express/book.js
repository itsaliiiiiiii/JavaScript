let books = [{
    id: 1,
    name: "book1",
    user: "ali"
}];

function addBook(book) {
    books.push(book);
}

function getBooks() {
    return books;
}

module.exports = {
    addBook, getBooks
}