import React, { useState } from 'react';

import { BrowserRouter as Router, Route } from 'react-router-dom';

const Skills = (props) => {
  const [skill, setSkill] = useState('');
  const [rating, setRating] = useState('');
  const [clicked, setClick] = useState(false);

  const cardStyling = {
    border: 'solid',
    textAlign: 'center',
    width: '200px',
    height: '150px',
    padding: '16px',
    margin: '16px',
  };

  const editSkillsCard = (e) => {
    if (clicked === false) {
      setClick(true);
    } else if (clicked === true) {
      setClick(false);
    }
  };

  //we start with a hook in skills that refers to whether the update button was clicked set to false

  //when the update button gets clicked, we set that hook value to true
  //the forms to update get rendered, with a submit button to submit the updates

  //when the submit button gets pressed, we set that hook value to false

  console.log(props);

  return (
    <div style={cardStyling}>
      <div>{props.name}</div>
      <div>Rating: {props.rating}</div>
      <button
        onClick={(events) =>
          props.deleteSkillsCard(events, props.id, props.notebook_id)
        }
      >
        Delete
      </button>
      <button onClick={editSkillsCard}>Edit</button>
      {clicked && (
        <form
          onSubmit={(events) =>
            props.submitChanges(
              events,
              skill,
              rating,
              props.id,
              props.notebook_id
            )
          }
        >
          <label>Name</label>
          <input type="text" onChange={(e) => setSkill(e.target.value)}></input>
          <label>Rating</label>
          <input
            type="number"
            onChange={(e) => setRating(e.target.value)}
          ></input>
          <button>Submit changes</button>
        </form>
      )}
    </div>
  );
};

export default Skills;
