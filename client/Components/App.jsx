import React, { Component } from 'react';

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import Notebook from './Notebook.jsx';
import Home from './Home.jsx';

// Swtich: it searches through its children <Route> elements to find one whose path matches the current URL
// One important thing to note is that a <Route path> matches the beginning of the URL, not the whole thing. So a <Route path="/"> will always match the URL. Because of this, we typically put this <Route> last in our <Switch>. Another possible solution is to use <Route exact path="/"> which does match the entire URL.

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notebookList: [],
      count: 30, //this allows the id to be unique - don't think we need this though as id is serial from the backend.
    };
    this.deleteSkillsCard = this.deleteSkillsCard.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.submitChanges = this.submitChanges.bind(this);
  }
  
  //drills from App to Notebook to Skills
  deleteSkillsCard(events, skillsid, notebook_id) {
    fetch(`/api/skills/${skillsid}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    fetch('/api/all')
      .then((res) => res.json())
      .then((data) => this.setState({ notebookList: data }));
    console.log(skillsid);
    console.log(notebook_id);
  }
  //drills from App to Notebook
  handleSubmit(events, skill, rating, id) {
    events.preventDefault();

    fetch('/api/skills/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        _id: this.state.count, //unique number
        notebook_id: id,
        name: skill,
        rating: rating,
      }),
    });

    fetch('/api/all')
      .then((res) => res.json())
      .then((data) => this.setState({ notebookList: data }));

    this.setState({ count: this.state.count + 1 });
  }
  //drills from App to Notebook to Skills
  submitChanges(events, skill, rating, id, notebook_id) {
    console.log('ID', id);
    events.preventDefault();

    fetch(`/api/skills/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        notebook_id,
        name: skill,
        rating: rating,
      }),
    });

    fetch('/api/all')
      .then((res) => res.json())
      .then((data) => this.setState({ notebookList: data }));
  }

  //fetches for the notebooks
  componentDidMount() {
    //fetches all information on all notebooks
    fetch('/api/all')
      .then((res) => res.json())
      .then((data) => this.setState({ notebookList: data }));
  }

  render() {
    console.log(this.state.notebookList);

    const generateLinks = this.state.notebookList.map((notebook) => {
      const {
        notebook_id,
        notebook_id: reactKey,
        notebook_name: name,
      } = notebook;

      // console.log(id, name);
      return (
        <li key={reactKey}>
          <Link to={`/${notebook_id}`}>{name}</Link>
        </li>
      );
    });

    const generateNotebookRoutes = this.state.notebookList.map((notebook) => {
      const {
        notebook_id,
        notebook_id: reactKey,
        notebook_name: name,
        description,
        skills,
        reminders,
        notes,
      } = notebook;

      return (
        <Route key={reactKey} path={`/${notebook_id}`}>
          <h1>{name}</h1>
          <Notebook
            notebook_id={notebook_id}
            reactKey={reactKey}
            description={description}
            skills={skills}
            reminders={reminders}
            deleteSkillsCard={this.deleteSkillsCard}
            handleSubmit={this.handleSubmit}
            submitChanges={this.submitChanges}
          />
        </Route>
      );
    });

    return (
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home Page!</Link>
            </li>
            {generateLinks}
          </ul>
        </nav>
        <Switch>
          {generateNotebookRoutes}
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    );
  }
}

export default App;
