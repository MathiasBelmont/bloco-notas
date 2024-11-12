import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getNotes, deleteNote } from "../services/api";
import { jsPDF } from "jspdf";
import { marked } from "marked";

function NoteList() {
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await getNotes();
      setNotes(response.data);
    } catch (error) {
      console.error("Erro ao carregar as notas:", error);
    }
  };

  const handleDelete = async (id) => {
    await deleteNote(id);
    fetchNotes();
  };

  const handleDownloadPDF = (note) => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text(note.title, 10, 10);
    doc.setFontSize(12);
    doc.text(marked(note.text), 10, 20);
    doc.save(`${note.title}.pdf`);
  };

  return (
    <div className="bg-gray-900 min-h-screen p-6 text-white">
      <h1 className="text-3xl font-bold mb-6">Minhas Notas</h1>
      <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))" }}>
        {notes.map((note) => (
          <div
            key={note.id}
            className="note-item relative card shadow-lg overflow-hidden cursor-pointer"
            style={{ backgroundColor: note.color }}
            onClick={() => setSelectedNote(note.id)}
          >
            <div className="p-4 truncate">
              <h2 className="text-lg font-semibold mb-2 truncate">{note.title}</h2>
              <div
                className="text-sm overflow-hidden"
                dangerouslySetInnerHTML={{ __html: marked(note.text) }}
              />
            </div>
  
            {selectedNote === note.id && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-70 text-white space-y-2 p-4">
                <Link to={`/edit/${note.id}`}>
                  <button className="btn btn-primary w-full">Editar</button>
                </Link>
                <button
                  onClick={() => document.getElementById('my_modal_3').showModal()}
                  className="btn btn-error w-full"
                >
                  Excluir
                </button>
                <dialog id="my_modal_3" className="modal">
                  <div className="modal-box">
                    <form method="dialog">
                      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <h3 className="font-bold text-lg">Calma ai paizão</h3>
                    <p className="py-4">Tem certeza que deseja excluir essa nota?</p>
                    <button onClick={() => handleDelete(note.id)} className="btn btn-error w-full">Sim</button>
                  </div>
                </dialog>
                <button
                  onClick={() => handleDownloadPDF(note)}
                  className="btn btn-accent w-full"
                >
                  Salvar em PDF
                </button>
                <button
                  onClick={() => setSelectedNote(null)}
                  className="btn btn-ghost w-full"
                >
                  Fechar
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
  
      <Link to="/edit/new">
        <button className="btn btn-outline btn-primary mt-6">Nova Nota</button>
      </Link>
    </div>
  );
  
}

export default NoteList;
