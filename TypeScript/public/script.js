var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
var bookList = document.getElementById("bookList");
var statsBooks = document.getElementById("statsBooks");
var statsPages = document.getElementById("statsPages");
var form = document.getElementById("bookForm");
function fetchBooks() {
    return __awaiter(this, void 0, void 0, function () {
        var res, books;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("http://localhost:3000/books")];
                case 1:
                    res = _a.sent();
                    return [4 /*yield*/, res.json()];
                case 2:
                    books = _a.sent();
                    renderBooks(books);
                    return [2 /*return*/];
            }
        });
    });
}
form.addEventListener("submit", function (e) { return __awaiter(_this, void 0, void 0, function () {
    var formData, data;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                e.preventDefault();
                formData = new FormData(form);
                data = {
                    title: formData.get("title").toString(),
                    author: formData.get("author").toString(),
                    pages: Number(formData.get("pages")),
                    pagesRead: Number(formData.get("pagesRead")),
                    status: formData.get("status").toString(),
                    price: Number(formData.get("price")),
                    format: formData.get("format").toString(),
                    suggestedBy: ((_a = formData.get("suggestedBy")) === null || _a === void 0 ? void 0 : _a.toString()) || "",
                    finished: 0
                };
                if (data.pagesRead >= data.pages) {
                    data.pagesRead = data.pages;
                    data.finished = 1;
                }
                return [4 /*yield*/, fetch("http://localhost:3000/books", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(data),
                    })];
            case 1:
                _b.sent();
                form.reset();
                fetchBooks();
                return [2 /*return*/];
        }
    });
}); });
function renderBooks(books) {
    bookList.innerHTML = "";
    var totalFinished = 0;
    var totalPages = 0;
    books.forEach(function (book) {
        var percent = Math.floor((book.pagesRead / book.pages) * 100);
        totalPages += book.pages;
        if (book.finished)
            totalFinished++;
        bookList.innerHTML += "\n      <div class=\"border p-4 rounded-xl shadow\">\n        <h3 class=\"text-xl font-bold\">".concat(book.title, "</h3>\n        <p>Author: ").concat(book.author, "</p>\n        <p>Status: ").concat(book.status, "</p>\n        <p>Progress: ").concat(percent, "%</p>\n\n        <div class=\"w-full bg-gray-200 rounded-full h-3\">\n          <div class=\"bg-blue-600 h-3 rounded-full\" style=\"width:").concat(percent, "%\"></div>\n        </div>\n\n        <button class=\"mt-3 bg-red-500 text-white px-3 py-1 rounded\"\n            onclick=\"deleteBook('").concat(book._id, "')\">\n          Delete\n        </button>\n      </div>\n    ");
    });
    statsBooks.textContent = "Books finished: ".concat(totalFinished);
    statsPages.textContent = "Total pages tracked: ".concat(totalPages);
}
window.deleteBook = function (id) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fetch("http://localhost:3000/books/".concat(id), { method: "DELETE" })];
            case 1:
                _a.sent();
                fetchBooks();
                return [2 /*return*/];
        }
    });
}); };
fetchBooks();
