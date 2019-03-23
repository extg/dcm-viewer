import React, { Component } from 'react';
import { Normalize, Box } from '@smooth-ui/core-sc'

import Header from './AppHeader'

import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Normalize/>
        <Header location={window.location}/>


      </div>
    );
  }
}

export default App;
