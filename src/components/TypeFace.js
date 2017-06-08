import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class GoogleFont extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontFamily: 'Montserrat',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const newVal = event.target.value;
    this.setState({ fontFamily: newVal });
    this.props.handleChange(newVal);
  }

  render() {
    return (
      <div>
        <input type="text" value={this.state.fontFamily} onChange={this.handleChange} />
      </div>
    );
  }
}

GoogleFont.propTypes = {
  handleChange: PropTypes.func.isRequired,
};
