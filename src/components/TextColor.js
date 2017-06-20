import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ColorPicker from './ColorPicker';

export default class TextColor extends Component {
  render() {
    const defaults = {
      textColor: '#000',
      defaultColor: '#000',
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
