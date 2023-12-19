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

// convention으로 data를 업데이트 할 때는 patch를 사용한다.
app.patch("/:noteId", async (req, res) => {
    const { noteId } = req.params;
    const note = await Note.findById(noteId);
    if (!note) return res.json({ message: "Note not found!" });
    const { title, description } = req.body as IncomingBody;
    if (title) note.title = title;
    if (description) note.description = description;

    await note.save();

    res.json({ note });
});

// listen to some port
app.listen(8000, () => {
    console.log("Server is listening on port 8000");
});
