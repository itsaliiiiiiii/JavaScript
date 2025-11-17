export interface BookData {
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

export default class Book {
    title: string;
    author: string;
    pages: number;
    pagesRead: number;
    status: string;
    price: number;
    format: string;
    suggestedBy?: string;
    finished: number;

    constructor(data: BookData) {
        this.title = data.title;
        this.author = data.author;
        this.pages = data.pages;
        this.pagesRead = data.pagesRead;
        this.status = data.status;
        this.price = data.price;
        this.format = data.format;
        this.suggestedBy = data.suggestedBy;
        this.finished = data.finished;
    }

    currentlyAt(): string {
        return `${this.pagesRead} / ${this.pages} pages`;
    }

    deleteBook(model: any, id: string) {
        return model.findByIdAndDelete(id);
    }
}
