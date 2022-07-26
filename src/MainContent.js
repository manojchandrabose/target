import React from 'react';
import './App.css';

const MainContent = ({activeNote, onUpdateNote}) => {
    const onEditField = (field, value) => {
        onUpdateNote({
          ...activeNote,
          [field]: value,
          lastModified: Date.now(),
        });
      };
      if (!activeNote) return <div className="noact-note">No Active Notes Available...</div>;

      return (
        <div className="app-main">
          <div className="mainnote-edit">
            <input
              type="text"
              id="title"
              placeholder="Note Title"
              value={activeNote.title}
              onChange={(e) => onEditField("title", e.target.value)}
              autoFocus
            />
            <textarea
              id="body"
              placeholder="Write your note here..."
              value={activeNote.body}
              onChange={(e) => onEditField("body", e.target.value)}
            />
          </div>
        </div>
      );
}

export default MainContent;