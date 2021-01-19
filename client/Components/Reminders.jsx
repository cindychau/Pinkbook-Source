//! DID NOT GET WORKING

import React, { useState } from 'react';

import { BrowserRouter as Router, Route } from 'react-router-dom';

const Reminders = (props) => {
  const [newDescription, setDescription] = useState('');
  const [dateCreated, setDateCreated] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = (e) => {
    console.log(props);

    fetch('/api/reminders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        _id: props.id,
        notebook_id: props.id,
        description: newDescription,
        date_created: dateCreated,
        time: dueDate,
      }),
    })
      .then((res) => res.json())
      .then((data) => data)
      .catch((error) => {
        console.error('Error:', error);
      });
    e.preventDefault();
  };

  const generateReminders = props.reminders.map((element) => {
    const { _id: id, _id: reactKey, description, time } = element;
    return (
      <div key={reactKey}>
        {description} : {time}
      </div>
    );
  });

  return (
    <div>
      <form>
        <label>
          <h2>Reminders</h2>
        </label>
        {generateReminders}
        <label>Description</label>
        <input type="text" onChange={(e) => setDescription(e.target.value)} />
        <label>Date Created</label>
        <input type="date" onChange={(e) => setDateCreated(e.target.value)} />
        <label>Due Date</label>
        <input type="date" onChange={(e) => setDueDate(e.target.value)} />
        <button onClick={handleSubmit}>Add Reminder</button>
      </form>
    </div>
  );
};

export default Reminders;
