import React, { Component } from 'react';
import Header from './Header';

export default class SideBar extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className="sidebar">
        <Header />
      </div>
    );
  }
}
