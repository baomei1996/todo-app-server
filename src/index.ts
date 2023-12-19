import express from "express";
import mongoose from "mongoose";
import Note, { NoteDocument } from "./models/note";

// connect to database
mongoose.set("strictQuery", true);
mongoose
    .connect("mongodb://localhost:27017/note-app")
    .then(() => {
        console.log("Connected to database");
    })
    .catch((err) => {
        console.error("DB connection Failed: ", err);
    });

// create a server
const app = express();

// this will parse post request coming from fetch.post() method
app.use(express.json());

// this will parse post request coming form html form
app.use(express.urlencoded({ extended: false }));

app.post("/", (req, res) => {
    // here we need data so that we can create new note/todo
    console.log(req.body);

    res.json({
        message: "I am a post request",
    });
});

interface IncomingBody {
    title: string;
    description?: string;
}

app.post("/create", async (req, res) => {
    // here we need data so that we can create new note/todo
    await Note.create<NoteDocument>({
        title: (req.body as IncomingBody).title,
        description: (req.body as IncomingBody).description,
    });

    res.json({
        message: "I am a post create request",
    });
});

// listen to some port
app.listen(8000, () => {
    console.log("Server is listening on port 8000");
});
