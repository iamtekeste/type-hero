import React from 'react';
import PropTypes from 'prop-types';
import TypeFace from './TypeFace';

const TextStyler = props => (
  <div className="text-styler">
    <div className="section-title">Text</div>
    <TypeFace handleChange={props.handlers.updateFontFamily} />
  </div>
);

TextStyler.propTypes = {
  handlers: PropTypes.shape({
    updateFontFamily: PropTypes.func,
  }).isRequired,
};
export default TextStyler;
