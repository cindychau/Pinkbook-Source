//! DID NOT GET WORKING YET

import React, { useEffect, useState } from 'react';

import { BrowserRouter as Router, Route } from 'react-router-dom';

const Home = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [page, setPage] = useState('');
  const [dateUpdated, setDateUpdated] = useState('');
  const [share, setShare] = useState('');

  const handleSubmit = (e) => {
    console.log(props);

    fetch('/api/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        _id: 38, 
        name: name,
        description: description,
        date_created: date,
        page_number: page,
        date_updated: date,
        shared_with: share,
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
      <h2>Home Page</h2>
      <form>
        <h3>Create a notebook</h3>
        <label>Enter notebook name</label>
        <input type="text" onChange={(e) => setName(e.target.value)} />
        <label>Enter notebook description</label>
        <input type="text" onChange={(e) => setDescription(e.target.value)} />
        <label>Enter date</label>
        <input type="date" onChange={(e) => setDate(e.target.value)} />
        <label>Page Number</label>
        <input type="number" onChange={(e) => setPage(e.target.value)} />
        <label>Enter date updated</label>
        <input type="date" onChange={(e) => setDateUpdated(e.target.value)} />
        <label>Enter who to share with</label>
        <input type="text" onChange={(e) => setShare(e.target.value)} />
        <button onClick={handleSubmit}>Submit</button>
      </form>
    </div>
  );
};

export default Home;
