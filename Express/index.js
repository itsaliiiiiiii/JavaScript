const express = require("express");
const {addBook,getBooks} = require("./book")
const app = express();
const PORT = 8080 ;

app.get("/",(req,res)=>{
    console.log("get books");
    console.log(getBooks);
    return res.json(getBooks())
})

app.listen(PORT ,()=>{
    console.log("App running in Port :", PORT)
})