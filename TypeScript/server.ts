import express, { Request, Response } from "express";
import mongoose from "mongoose";
import BookModel from "./BookModel";
import BookClass from "./book";
import path from "path";
import cors from "cors";


const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));
console.log("start")
mongoose.connect("mongodb://localhost:27017/mongo_tp")
    .then(() => console.log("MongoDB connected"));

app.get("/books", async (req: Request, res: Response) => {
    const books = await BookModel.find();
    res.json(books);
});

app.post("/books", async (req: Request, res: Response) => {
    const book = new BookClass(req.body);
    const saved = await BookModel.create(book);
    res.json(saved);
});

app.delete("/books/:id", async (req: Request, res: Response) => {
    await BookModel.findByIdAndDelete(req.params.id);
    res.json({ success: true });
});

app.listen(3000, () => console.log("Server running on port 3000"));
