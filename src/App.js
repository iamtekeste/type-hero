import React, { Component } from 'react';
import Canvas from './components/Canvas';
import SideBar from './components/SideBar';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fontFamily: 'Montserrat',
      fontSize: '34px',
      fontWeight: 700,
      fontStyle: 'normal',
      textColor: '#9B51E0',
      backgroundColor: '#F8F3F3',
    };
    this.updateFontFamily = this.updateFontFamily.bind(this);
    this.updateFontVariant = this.updateFontVariant.bind(this);
  }

  updateFontFamily(fontFamily) {
    this.setState({ fontFamily });
  }

  updateFontVariant(fontVaraint) {
    this.setState({
      fontWeight: fontVaraint.weight,
      fontStyle: fontVaraint.style,
    });
  }

  render() {
    const handlers = {
      updateFontFamily: this.updateFontFamily,
      updateFontVariant: this.updateFontVariant,
    };
    return (
      <div className="App">
        <Canvas {...this.state} />
        <SideBar handlers={handlers} />
      </div>
    );
  }
}

export default App;
