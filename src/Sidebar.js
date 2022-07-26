import React from 'react';

const Sidebar = ({notes, onAddNote, activeNote, setActiveNote}) => {
    const sortedNotes = notes.sort((a, b) => b.lastModified - a.lastModified);
    return (
        <>
        <div className="sidebar-head">
            <h1>Notes</h1>
        </div>
        <div className="sidebarnotes">
            {sortedNotes.map(({ id, title, body, lastModified }, i) => (
            <div
                className={`sidebarnote ${id === activeNote ? "active" : ''}`}
                onClick={() => setActiveNote(id)}
                key={i}
            >
            <div className="sidebarnote-title">
            <strong>{title}</strong>
            </div>

            {/* showing date and content */}
            <small className="note-data">
            {new Date(lastModified).toLocaleDateString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
              })} {' '}
              {body && body.substr(0, 20) + "..."}
            </small>
            </div>
            ))}
        </div>
        <div className='addfolder'>
        <button onClick={onAddNote}>Add Folder</button>
        </div>
        </>
    )
}

export default Sidebar;