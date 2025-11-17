interface Book {
    _id?: string;
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

const bookList = document.getElementById("bookList")!;
const statsBooks = document.getElementById("statsBooks")!;
const statsPages = document.getElementById("statsPages")!;
const form = document.getElementById("bookForm") as HTMLFormElement;

async function fetchBooks() {
    const res = await fetch("http://localhost:3000/books");
    const books: Book[] = await res.json();
    renderBooks(books);
}

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const data: Book = {
        title: formData.get("title")!.toString(),
        author: formData.get("author")!.toString(),
        pages: Number(formData.get("pages")),
        pagesRead: Number(formData.get("pagesRead")),
        status: formData.get("status")!.toString(),
        price: Number(formData.get("price")),
        format: formData.get("format")!.toString(),
        suggestedBy: formData.get("suggestedBy")?.toString() || "",
        finished: 0
    };

    if (data.pagesRead >= data.pages) {
        data.pagesRead = data.pages;
        data.finished = 1;
    }

    await fetch("http://localhost:3000/books", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });

    form.reset();
    fetchBooks();
});

function renderBooks(books: Book[]) {
    bookList.innerHTML = "";

    let totalFinished = 0;
    let totalPages = 0;

    books.forEach(book => {
        const percent = Math.floor((book.pagesRead / book.pages) * 100);

        totalPages += book.pages;
        if (book.finished) totalFinished++;

        bookList.innerHTML += `
      <div class="border p-4 rounded-xl shadow">
        <h3 class="text-xl font-bold">${book.title}</h3>
        <p>Author: ${book.author}</p>
        <p>Status: ${book.status}</p>
        <p>Progress: ${percent}%</p>

        <div class="w-full bg-gray-200 rounded-full h-3">
          <div class="bg-blue-600 h-3 rounded-full" style="width:${percent}%"></div>
        </div>

        <button class="mt-3 bg-red-500 text-white px-3 py-1 rounded"
            onclick="deleteBook('${book._id}')">
          Delete
        </button>
      </div>
    `;
    });

    statsBooks.textContent = `Books finished: ${totalFinished}`;
    statsPages.textContent = `Total pages tracked: ${totalPages}`;
}

(window as any).deleteBook = async (id: string) => {
    await fetch(`http://localhost:3000/books/${id}`, { method: "DELETE" });
    fetchBooks();
};

fetchBooks();
