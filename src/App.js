import React, { Component } from 'react';
import Canvas from './components/Canvas';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fontFamily: 'Montserrat',
      fontSize: '34px',
      fontWeight: 'SemiBold',
      textColor: '#9B51E0',
      backgroundColor: '#F8F3F3',
    };
  }

  render() {
    return (
      <div className="App">
        <Canvas {...this.state} />
      </div>
    );
  }
}

export default App;
