import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getNoteById, createNote, updateNote } from "../services/api";

function NoteEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [color, setColor] = useState("#ffffff");

  useEffect(() => {
    if (id && id !== "new") {
      loadNote();
    }
  }, [id]);

  const loadNote = async () => {
    const response = await getNoteById(id);
    const note = response.data;
    setTitle(note.title);
    setText(note.text);
    setColor(note.color);
  };

  const handleSave = async () => {
    const noteData = { title, text, color };

    if (id === "new") {
      await createNote(noteData);
    } else {
      await updateNote(id, noteData);
    }
    navigate("/");
  };

  return (
    <div className="bg-gray-900 min-h-screen p-6 text-white">
      <h1 className="text-3xl font-bold mb-6">{id === "new" ? "Nova Nota" : "Editar Nota"}</h1>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Título da Nota"
        className="input input-bordered w-full mb-4"
      />
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Digite seu texto em Markdown..."
        className="textarea textarea-bordered w-full mb-4 h-60"
      />
      <input
        type="color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
        className="w-10 h-10 mb-4 cursor-pointer"
      />
      <button onClick={handleSave} className="btn btn-primary w-full">
        Salvar
      </button>
    </div>
  );
}

export default NoteEditor;
