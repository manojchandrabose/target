import React, {useState, useEffect} from 'react';
import "./App.css";
import Sidebar from './Sidebar';
import MainContent from './MainContent';
//import axios from 'axios';

const App = () => {
  const [notes, setNotes] = useState(
    localStorage.notes ? JSON.parse(localStorage.notes) : []
  );
  const [activeNote, setActiveNote] = useState(false);

  // used localStorage to store the details
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const onAddNote = () => {
    const newNote = {
      id: Math.random().toString(36).slice(2, 9),
      title: "Untitled Note",
      body: "",
      lastModified: Date.now(),
    };
    setNotes([newNote, ...notes]);
    setActiveNote(newNote.id);
  };

  const onUpdateNote = (updatedNote) => {
    const updatedNotesArr = notes.map((note) => {
      if (note.id === updatedNote.id) {
        // console.log('if'+note.id)
        return updatedNote;
      }
    
      return note;
    });
    // fetch('https://my-json-server.typicode.com/manojchandrabose/target/posts', {
    //   method: 'POST',
    //   body: JSON.stringify(updatedNotesArr),
    //   headers: {
    //     "Access-Control-Allow-Origin": "*",
    //     "Content-type": "application/json; charset=UTF-8"
    //   }
    // })
    // .then((res) => {
    //   console.log(res)
    // })
    setNotes(updatedNotesArr);
  };

  const getActiveNote = () => {
    return notes.find(({ id }) => id === activeNote);
  };

  return (
      <div className='app'>
        <div className='header'>
          <div className='title'>
            <h3>Notes App</h3>
          </div>
        </div>
        <div className='container'>
          <div className='sidebar'>
            <Sidebar 
            notes={notes}
            onAddNote={onAddNote}
            activeNote={activeNote}
            setActiveNote={setActiveNote}
            />
          </div>
          <div className='maincontent'>
            <MainContent activeNote={getActiveNote()} onUpdateNote={onUpdateNote} />
          </div>
        </div>
      </div>
  )
}

export default App;