//! DID NOT GET WORKING

import React, { useState } from 'react';

import { BrowserRouter as Router, Route } from 'react-router-dom';

const Notes = (props) => {
  const [notes, setNotes] = useState('');

  const handleSubmit = (e) => {
    console.log('notes', notes)
    console.log(props);

    fetch('/api/notes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        notebook_id: props.id,
        textbox: notes,
      }),
    })
      .then((res) => res.json())
      .then((data) => data)
      .catch((error) => {
        console.error('Error:', error);
      });
    e.preventDefault();
  };

  return (
    <div>
      <form>
        <label><h2>Notes</h2></label>
        <textarea
          onChange={(e) => {
            setNotes(e.target.value);
          }}
          rows="4"
          cols="50"
          name="comment"
          form="usrform"
        >
          {notes}
        </textarea>
        <button onClick={handleSubmit}>Submit</button>
      </form>
    </div>
  );
};

export default Notes;
