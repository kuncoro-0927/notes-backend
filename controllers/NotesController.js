const { query } = require("../config/Database.js");

const CreateNote = async (req, res) => {
  try {
    const { title, datetime, note } = req.body;
    if (!title || !datetime || !note) {
      return res.status(400).json({ msg: "All fields must be filled" });
    }
    const result = await query(
      "INSERT INTO notes (title, datetime, note) VALUES (?, ?, ?)",
      [title, datetime, note]
    );
    return res.status(201).json({
      msg: "Note successfully added",
      data: {
        id: result.insertId,
        title: title,
        datetime: datetime,
        note: note,
      },
    });
  } catch (error) {
    console.error("Failed to add note:", error.message);
    return res
      .status(500)
      .json({ msg: "Failed to add note", error: error.message });
  }
};

const GetAllNotes = async (req, res) => {
  try {
    const result = await query("SELECT * FROM notes");
    return res
      .status(200)
      .json({ msg: "Successfully retrieved all notes", data: result });
  } catch (error) {
    console.error("Failed to retrieve notes:", error.message);
    return res
      .status(500)
      .json({ msg: "Failed to retrieve notes", error: error.message });
  }
};

const GetNoteById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await query("SELECT * FROM notes WHERE id = ?", [id]);
    if (result.length === 0) {
      return res.status(404).json({ msg: "Note not found" });
    }
    return res
      .status(200)
      .json({ msg: "Successfully retrieved note", data: result[0] });
  } catch (error) {
    console.error("Failed to retrieve note:", error.message);
    return res
      .status(500)
      .json({ msg: "Failed to retrieve note", error: error.message });
  }
};

const UpdateNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, datetime, note } = req.body;

    if (!title || !datetime || !note) {
      return res.status(400).json({ msg: "All fields must be filled" });
    }

    const result = await query(
      "UPDATE notes SET title = ?, datetime = ?, note = ? WHERE id = ?",
      [title, datetime, note, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ msg: "Note not found" });
    }

    return res.status(200).json({ msg: "Note successfully updated" });
  } catch (error) {
    console.error("Failed to update note:", error.message);
    return res
      .status(500)
      .json({ msg: "Failed to update note", error: error.message });
  }
};

const DeleteNote = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await query("DELETE FROM notes WHERE id = ?", [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ msg: "Note not found" });
    }

    return res.status(200).json({ msg: "Note successfully deleted" });
  } catch (error) {
    console.error("Failed to delete note:", error.message);
    return res
      .status(500)
      .json({ msg: "Failed to delete note", error: error.message });
  }
};

module.exports = {
  CreateNote,
  GetAllNotes,
  GetNoteById,
  UpdateNote,
  DeleteNote,
};
