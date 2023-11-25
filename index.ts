import express from "express";

// create a server
const app = express();

app.get("/", (req, res) => {
    res.send("<h1>Hello world</h1>");
});

// listen to some port
app.listen(8000, () => {
    console.log("Server is listening on port 8000");
});
