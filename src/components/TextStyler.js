import React from 'react';
import PropTypes from 'prop-types';
import TypeFace from './TypeFace';
import TextColor from './TextColor';
import BackgroundColor from './BackgroundColor';

const TextStyler = (props) => {
  const handlers = props.handlers;
  return (
    <div className="text-styler">
      <div className="section-title">Text</div>
      <TypeFace {...handlers} />
      <TextColor updateTextColor={handlers.updateTextColor} />
      <BackgroundColor updateBackgroundColor={handlers.updateBackgroundColor} />
    </div>
  );
};

TextStyler.propTypes = {
  handlers: PropTypes.shape({
    updateFontFamily: PropTypes.func,
    updateFontVariant: PropTypes.func,
    updateFontSize: PropTypes.func,
    updateTextColor: PropTypes.func,
    updateBackgroundColor: PropTypes.func,
  }).isRequired,
};
export default TextStyler;
