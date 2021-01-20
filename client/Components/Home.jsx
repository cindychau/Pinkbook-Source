import React, { useState } from 'react';

// import { BrowserRouter as Router, Route } from 'react-router-dom';

const Home = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [share, setShare] = useState('');

  const handleSubmit = (e) => {
    console.log(props);

    fetch('/api/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        description: description,
        date_created: date,
        shared_with: share,
      }),
    })
      .then((res) => res.json('New notebook created!'))
      .catch((error) => {
        console.error('Error:', error);
      });
    e.preventDefault();
  };

  return (
    <div>
      <h2>Home Page</h2>
      <form>
        <h3>Create a notebook</h3>
        <label>Enter notebook name</label>
        <input type="text" onChange={(e) => setName(e.target.value)} />
        <label>Enter notebook description</label>
        <input type="text" onChange={(e) => setDescription(e.target.value)} />
        <label>Enter date</label>
        <input type="date" onChange={(e) => setDate(e.target.value)} />
        <label>Enter who to share with</label>
        <input type="text" onChange={(e) => setShare(e.target.value)} />
        <button onClick={handleSubmit}>Submit</button>
      </form>
    </div>
  );
};

export default Home;
