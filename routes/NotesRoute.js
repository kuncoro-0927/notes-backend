const express = require("express");
const {
  CreateNote,
  GetAllNotes,
  GetNoteById,
  UpdateNote,
  DeleteNote,
} = require("../controllers/NotesController");

const NotesRoute = express.Router();

NotesRoute.post("/notes", CreateNote);
NotesRoute.get("/notes", GetAllNotes);
NotesRoute.get("/notes/:id", GetNoteById);
NotesRoute.put("/notes/:id", UpdateNote);
NotesRoute.delete("/notes/:id", DeleteNote);

module.exports = NotesRoute;
