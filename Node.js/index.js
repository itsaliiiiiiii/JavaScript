
const http = require("node:http");

const server = http.createServer((req, res) => {
    res.writeHead(200,{ "Content-Type": "text/html" })
    if (req.url === "/") {
        res.write("<h1>Hello Home</h1>")
    }
    else if (req.url === "/contact") {
        res.write("<h1>Hello Contact</h1>")
    } else {
        res.write("<h1>404</h1>")
    } 
})



server.listen(3000, () => {
    console.log("running")
})