import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ColorPicker from './ColorPicker';

export default class TextColor extends Component {
  render() {
    const defaults = {
      textColor: '#9b51e0',
      defaultColor: '#9b51e0',
    };
    return (
      <div className="text-color">
        <ColorPicker handleColorChange={this.props.updateTextColor} defaults={defaults} />
      </div>
    );
  }
}

TextColor.propTypes = {
  updateTextColor: PropTypes.func.isRequired,
};
