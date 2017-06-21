import React from 'react';
import PropTypes from 'prop-types';
import ColorPicker from './ColorPicker';

export default function TextColor(props) {
  const defaults = {
    textColor: '#f8f3f3',
    defaultColor: '#f8f3f3',
  };
  return (
    <div className="background-color">
      <div className="section-title">Background</div>
      <ColorPicker handleColorChange={props.updateBackgroundColor} defaults={defaults} />
    </div>
  );
}

TextColor.propTypes = {
  updateBackgroundColor: PropTypes.func.isRequired,
};
