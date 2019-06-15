import React, { Component } from 'react';
import axios from 'axios';
import { Switch, Route } from 'react-router-dom';

import './App.css';
import SmurfForm from './components/SmurfForm';
import Smurfs from './components/Smurfs';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      smurfs: [],
    };
  }

  componentDidMount = () => {
    axios.get('http://localhost:3333/smurfs')
      .then(({ data }) => {
        console.log(data);
        this.setState({
          smurfs: data
        });
      });
  }

  postSmurf = (smurf) => {
    axios.post('http://localhost:3333/smurfs', smurf)
      .then(({ data }) => {
        console.log(data);
        this.setState({
          smurfs: data
        });
      });
  };

  // add any needed code to ensure that the smurfs collection exists on state and it has data coming from the server
  // Notice what your map function is looping over and returning inside of Smurfs.
  // You'll need to make sure you have the right properties on state and pass them down to props.
  render() {
    return (
      <div className="App">
        <Switch>
          <Route path="/" exact render={() => <Smurfs smurfs={this.state.smurfs} />} />
          <Route path="/smurf-form" render={() => <SmurfForm postSmurf={this.postSmurf} />} />
        </Switch>
      </div>
    );
  }
}

export default App;
