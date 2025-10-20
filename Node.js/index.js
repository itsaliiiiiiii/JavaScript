const http = require("node:http");
const server = http.serve((req, res) => {
    res.writeHead({ "Content-Type": "text/html" })
    if (req.url === "/home") {
        res.write("<h1>Hello Home</h1>")
    }
    else if (req.url === "/contact") {
        res.write("<h1>Hello Contact</h1>")
    } else {
        res.write("<h1>404</h1>")
    }
})