import React, { Component } from 'react';
import { Calendar } from './components/Calendar';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {

    return (
      <div className="App">
        <Calendar />
      </div>
    );
  }
}

export default App;
