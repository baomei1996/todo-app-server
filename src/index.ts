import express from "express";
import mongoose from "mongoose";

// connect to database
mongoose.set("strictQuery", true);
mongoose
    .connect("mongodb://localhost:27017/test")
    .then(() => {
        console.log("Connected to database");
    })
    .catch((err) => {
        console.error("DB connection Failed: ", err);
    });

// create a server
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post("/", (req, res) => {
    // here we need data so that we can create new note/todo
    console.log(req.body);

    res.json({
        message: "I am a post request",
    });
});

// listen to some port
app.listen(8000, () => {
    console.log("Server is listening on port 8000");
});
