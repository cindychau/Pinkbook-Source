const { response } = require('express');
const db = require('../Models/pinkbooksql.js');

const notebookController = {};

//Get all notebooks

notebookController.getNotebooks = (req, res, next) => {
  const allNotebooksSQL = 'SELECT * FROM notebook';
  db.query(allNotebooksSQL, (error, response) => {
    if (error) {
      console.log(error);
      return next(error);
    }
    res.locals = response.rows;
    return next();
  });
};

//When adding a new notebook, we also add in a new row into our notes, reminders, and skills tables
//to ensure that those components will render on the page after adding in a new notebook

//Add notebooks
notebookController.addNotebook = (req, res, next) => {
  const addNotebookSQL = {
    text:
      'INSERT INTO notebook (name, description, date_created, shared_with) VALUES ($1, $2, $3, $4) RETURNING *',
    values: [
      req.body.name,
      req.body.description,
      req.body['date_created'],
      req.body['shared_with'],
    ],
  };

  db.query(addNotebookSQL, (error, response) => {
    if (error) {
      console.log(error);
      return next(error);
    }
    res.locals = response.rows[0];
    return next();
  });
};

//Adding notes when adding a new notebook
notebookController.addNotesForAddingNotebook = (req, res, next) => {
  const addNotesSQL = {
    text: 'INSERT INTO notes (notebook_id, textbox) VALUES ($1, $2)',
    values: [req.body._id, ''],
  };
  db.query(addNotesSQL, (error, response) => {
    if (error) {
      console.log(error);
      return next(error);
    }
    res.locals.notes = [response.rows[0]];
    return next();
  });
};

//Adding skills when adding a new notebook
notebookController.addSkillsForAddingNotebook = (req, res, next) => {
  const addSkillsForAddingNotebookSQL = {
    text: 'INSERT INTO skills (notebook_id, name, rating) VALUES ($1, $2, $3)',
    values: [req.body._id, '', 0],
  };
  db.query(addSkillsForAddingNotebookSQL, (error, response) => {
    if (error) {
      console.log(error);
      return next(error);
    }
    res.locals.skills = [response.rows[0]];
    return next();
  });
};

//Adding reminders when adding a new notebook
notebookController.addRemindersForAddingNotebook = (req, res, next) => {
  const addRemindersSQL = {
    text:
      'INSERT INTO reminders (notebook_id, description, time) VALUES ($1, $2, $3)',
    values: [req.body._id, '', ''],
  };
  db.query(addRemindersSQL, (error, response) => {
    if (error) {
      console.log(error);
      return next(error);
    }
    res.locals.reminders = [response.rows[0]];
    return next();
  });
};

//Update notebook
notebookController.updateNotebook = (req, res, next) => {
  const updateNotebookSQL = {
    text:
      'UPDATE notebook SET (_id, name, description, date_updated, shared_with) = ($1, $2, $3, $4, $5) WHERE _id = $1 RETURNING *',
    values: [
      req.params.id,
      req.body.name,
      req.body.description,
      req.body.date_updated,
      req.body.shared_with,
    ],
  };

  db.query(updateNotebookSQL, (error, response) => {
    if (error) {
      console.log(error);
      return next(error);
    }
    res.locals.updateNotebook = response.rows[0];
    return next();
  });
};

//When deleting a notebook, we also need to make sure to remove any corresponding rows
//from our notes, reminders and skills tables that are related to that notebook

//Delete notebooks part 4, deleting actual notebook
notebookController.deleteNotebook = (req, res, next) => {
  const deleteNotebookSQL = {
    text: 'DELETE FROM notebook WHERE _id = ($1)',
    values: [req.params.id],
  };
  db.query(deleteNotebookSQL, (error, response) => {
    if (error) {
      console.log(error);
      return next(error);
    }
    return next();
  });
};

//Delete corresponding notes when deleting a notebook
notebookController.deleteNotesForDeletingNotebook = (req, res, next) => {
  const deleteNotesSQL = {
    text: 'DELETE FROM notes WHERE notebook_id = ($1)',
    values: [req.params.id],
  };
  db.query(deleteNotesSQL, (error, response) => {
    if (error) {
      console.log(error);
      return next(err);
    }
    return next();
  });
};

//Delete corresponding skills when deleting a notebook
notebookController.deleteSkillsForDeletingNotebook = (req, res, next) => {
  const deleteSkillsSQL = {
    text: 'DELETE FROM skills WHERE notebook_id = ($1)',
    values: [req.params.id],
  };
  db.query(deleteSkillsSQL, (error, response) => {
    if (error) {
      console.log(error);
      return next(error);
    }
    return next();
  });
};

//Delete corresponding reminders when deleting a notebook
notebookController.deleteRemindersForDeletingNotebook = (req, res, next) => {
  const deleteRemindersSQL = {
    text: 'DELETE FROM reminders WHERE notebook_id = ($1)',
    values: [req.params.id],
  };
  db.query(deleteRemindersSQL, (error, response) => {
    if (error) {
      console.log(error);
      return next(error);
    }
    return next();
  });
};

//---------------------------------------------------------------------------------------------------------------------------------

//Get all NotebookNotes, Skills, Reminders info into one res.locals that can be fetched from the frontend to populate components
//EXAMPLE of what that would look like:
// [
//   {
//       "notebook_id": test,
//       "notebook_name": "Test",
//       "notebook_description": "Remove id",
//       "notebook_date_created": "1-18-2021",
//       "notebook_shared_with": "Joe Ed",
//       "skills": [{
//         'name': 'testName',
//         'rating': 'rating'
//       }],
//       "reminders": [{
//         "description": 'test description',
//         'time': 'test time'
//       }]
//   },
// ]

notebookController.notebookDetails = (req, res, next) => {
  const notebookDetailsSQL =
    'SELECT notebook._id as notebook_id, notebook.name as notebook_name, notebook.description as notebook_description, notebook.date_created as notebook_date_created, notebook.shared_with as notebook_shared_with from Notebook ';

  db.query(notebookDetailsSQL, (error, response) => {
    if (error) {
      console.log(error);
      return next(error);
    }
    //adding in initial notebook data to the res.locals
    res.locals = response.rows;
    return next();
  });
};

notebookController.notesDetails = (req, res, next) => {
  const noteDetailsSQL =
    'SELECT notes._id as _id, notes.textbox as textbox, notes.notebook_id as notebook_id FROM notes';

  db.query(noteDetailsSQL, (error, response) => {
    if (error) {
      console.log(error);
      return next(error);
    }

    //add a notes property to each notebook object and populate with data from notes table
    //set up our outer loop
    res.locals.forEach((notebook) => {
      //set up inner loop
      response.rows.forEach((notesObject) => {
        //match up notebook_id in notebooks and notebook_id in notesObject
        if (notebook.notebook_id === Number(notesObject.notebook_id)) {
          //assign notes property to that given notebook as object with a textbook property and value from the notesObject
          notebook.notes = {
            textbox: notesObject.textbox,
            _id: notesObject._id,
          };
        }
      });
    });
    return next();
  });
};

notebookController.skillsDetails = (req, res, next) => {
  const skillsDetailsSQL =
    'SELECT skills.notebook_id, skills.name, skills.rating, skills._id FROM skills ';

  db.query(skillsDetailsSQL, (error, response) => {
    if (error) {
      console.log(error);
      return next(error);
    }
    //add a skills property to each notebook object
    res.locals.forEach((notebook) => {
      notebook.skills = [];
    });

    //populate each skills property on each object with info from skills table

    //loop over each notebook
    res.locals.forEach((notebook) => {
      //loop over each skills object in response
      response.rows.forEach((skillsObject) => {
        //check if the notebooks match with the skillsObject
        if (notebook.notebook_id === Number(skillsObject.notebook_id)) {
          //if they do, then push in an object for each skill with its rating and name
          notebook.skills.push({
            name: skillsObject.name,
            rating: skillsObject.rating,
            _id: skillsObject._id,
          });
        }
      });
    });

    return next();
  });
};

notebookController.remindersDetails = (req, res, next) => {
  const remindersDetailsSQL =
    'SELECT reminders._id as _id, reminders.notebook_id as notebook_id, reminders.description as reminders_description, reminders.time as reminders_time FROM reminders';

  db.query(remindersDetailsSQL, (error, response) => {
    if (error) {
      console.log(error);
      return next(error);
    }
    //add a reminders property to each notebook object
    res.locals.forEach((notebook) => {
      notebook.reminders = [];
    });
    //populate each reminder property on each object with info from reminders table
    res.locals.forEach((notebook) => {
      response.rows.forEach((reminderObject) => {
        if (notebook.notebook_id === Number(reminderObject.notebook_id)) {
          notebook.reminders.push({
            description: reminderObject.reminders_description,
            time: reminderObject.reminders_time,
            _id: reminderObject._id,
          });
        }
      });
    });
    return next();
  });
};

//Add notes
notebookController.addNotes = (req, res, next) => {
  const addNotesSQL = {
    text:
      'INSERT INTO notes (_id, notebook_id, textbox, date_created, page_number,date_updated, shared_with) VALUES ($1, $2, $3, $4, $5, $6, $7)',
    values: [
      req.body._id,
      req.body.notebook_id,
      req.body.textbox,
      req.body.date_created,
      req.body.page_number,
      req.body.date_updated,
      req.body.shared_with,
    ],
  };
  db.query(addNotesSQL, (error, response) => {
    if (error) {
      console.log(error);
      return next(error);
    }
    res.locals = response.rows[0];
    return next();
  });
};
//Update notes

notebookController.updateNotes = (req, res, next) => {
  const updateNotesSQL = {
    text:
      'UPDATE notes SET (_id, textbox, date_created, page_number, date_updated, shared_with) = ($1, $2, $3, $4, $5, $6) WHERE _id = $1 RETURNING *',
    values: [
      req.params.id,
      req.body.textbox,
      req.body.date_created,
      req.body.page_number,
      req.body.date_updated,
      req.body.shared_with,
    ],
  };
  db.query(updateNotesSQL, (error, response) => {
    if (error) {
      console.log(error);
      return next(error);
    }
    res.locals.updateNotebook = response.rows[0];
    return next();
  });
};

//Delete notes

notebookController.deleteNotes = (req, res, next) => {
  const deleteNotesSQL = {
    text: 'DELETE FROM notes WHERE _id = ($1)',
    values: [req.params.id],
  };
  db.query(deleteNotesSQL, (error, response) => {
    if (error) {
      console.log(error);
      return next(err);
    }
    return next();
  });
};

//---------------------------------------------------------------------------------------------------------------------------------

//Add skills
notebookController.addSkills = (req, res, next) => {
  const addSkillsSQL = {
    text:
      'INSERT INTO skills (_id, notebook_id, name, rating) VALUES ($1, $2, $3, $4)',
    values: [
      req.body._id,
      req.body.notebook_id,
      req.body.name,
      req.body.rating,
    ],
  };
  db.query(addSkillsSQL, (error, response) => {
    if (error) {
      console.log(error);
      return next(error);
    }
    res.locals = response.rows[0];
    return next();
  });
};

//Update skills
notebookController.updateSkills = (req, res, next) => {
  const updateSkillsSQL = {
    text:
      'UPDATE SKILLS SET (_id, notebook_id, name, rating) = ($1, $2, $3, $4) WHERE _id = $1 RETURNING *',
    values: [
      req.params.id,
      req.body.notebook_id,
      req.body.name,
      req.body.rating,
    ],
  };
  db.query(updateSkillsSQL, (error, response) => {
    if (error) {
      console.log(error);
      return next(error);
    }
    res.locals.updateSkills = response.rows[0];
    return next();
  });
};

//Delete notebook
notebookController.deleteSkills = (req, res, next) => {
  const deleteSkillsSQL = {
    text: 'DELETE FROM skills WHERE _id = ($1)',
    values: [req.params.id],
  };
  db.query(deleteSkillsSQL, (error, response) => {
    if (error) {
      console.log(error);
      return next(error);
    }
    return next();
  });
};

//---------------------------------------------------------------------------------------------------------------------------------

//Add reminders

notebookController.addReminders = (req, res, next) => {
  const addRemindersSQL = {
    text:
      'INSERT INTO reminders (_id, notebook_id, description, date_created, time) VALUES ($1, $2, $3, $4, $5)',
    values: [
      req.body._id,
      req.body.notebook_id,
      req.body.description,
      req.body.date_created,
      req.body.time,
    ],
  };
  db.query(addRemindersSQL, (error, response) => {
    if (error) {
      console.log(error);
      return next(error);
    }
    res.locals = response.rows[0];
    return next();
  });
};

//Update reminders
notebookController.updateReminders = (req, res, next) => {
  const updateRemindersSQL = {
    text:
      'UPDATE REMINDERS SET (_id, notebook_id, description, date_created, time) = ($1, $2, $3, $4, $5) WHERE _id = $1',
    values: [
      req.params.id,
      req.body.notebook_id,
      req.body.description,
      req.body.date_created,
      req.body.time,
    ],
  };
  db.query(updateRemindersSQL, (error, response) => {
    if (error) {
      console.log(error);
      return next(error);
    }
    res.locals.updateReminders = response.rows[0];
    return next();
  });
};
//Delete reminders
notebookController.deleteReminders = (req, res, next) => {
  const deleteRemindersSQL = {
    text: 'DELETE FROM reminders WHERE _id = ($1)',
    values: [req.params.id],
  };
  db.query(deleteRemindersSQL, (error, response) => {
    if (error) {
      console.log(error);
      return next(error);
    }
    return next();
  });
};

module.exports = notebookController;
