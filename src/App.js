import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NoteList from "./components/NoteList";
import NoteEditor from "./components/NoteEditor";

// iniciar banco de dados 'json-server --watch db.json --port 3001'
//iniciar aplicação npm start

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<NoteList />} />
        <Route path="/edit/:id" element={<NoteEditor />} />
      </Routes>
    </Router>
  );
}

export default App;
