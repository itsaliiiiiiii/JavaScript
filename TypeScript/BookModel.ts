import mongoose, { Schema, Document } from "mongoose";

export interface IBook extends Document {
    title: string;
    author: string;
    pages: number;
    pagesRead: number;
    status: string;
    price: number;
    format: string;
    suggestedBy?: string;
    finished: number;
}

const BookSchema = new Schema<IBook>({
    title: String,
    author: String,
    pages: Number,
    pagesRead: Number,
    status: String,
    price: Number,
    format: String,
    suggestedBy: String,
    finished: Number
});

export default mongoose.model<IBook>("Book", BookSchema);
