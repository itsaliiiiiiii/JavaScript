const session = require("express-session");
const express = require("express");
const { addBook, getBooks } = require("./books")
const app = express();
const PORT = 8080;
app.use(express.json());

app.use(
    session({
        secret: "keykey2",
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: false,
            httpOnly: true,
            sameSite: "lax"
        }
    })
);


app.post("/login", (req, res) => {
    const { user } = req.body;
    req.session.user = user;
    return res.sendStatus(200);
});


app.get("/", (req, res) => {
    if (!req.session.user) {
        return res.status(400).json({ error: "need to login" });
    }
    console.log("get books");
    return res.json(getBooks())
})

app.post("/", async (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ error: "Please log in first" });
    }

    const { id, name, user } = req.body;
    if (!id || !name) {
        return res.status(400).json({ error: "id and name are required" });
    }

    await addBook({
        id: id,
        name: name,
        user: user,
    });

    console.log("add book");
    return res.sendStatus(200);
});

app.post("/logout", (req, res) => {
    req.session.destroy(err => {
        if (err) return res.status(500).json({ message: "Error logging out" });
        res.json({ message: "Logged out successfully" });
    });
});

app.listen(PORT, () => {
    console.log("App running in Port :", PORT)
})