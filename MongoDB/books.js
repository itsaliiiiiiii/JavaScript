const connectDB = require("./db")
const mongoose = require("mongoose")
connectDB()
const schema = new mongoose.Schema({
    id : Number,
    name: String,
    user : String
})

const Book = mongoose.model("book",schema)

async function addBook(book) {
    try {
        const object = new Book({
            id: book.id,
            name: book.name,
            user: book.user,
        });
        await object.save();
        console.log("Saved book successfully");
    } catch (error) {
        console.error("Error saving book:", error);
    }
}

function getBooks() {
    // return books;
}

module.exports = {
    addBook, getBooks
}