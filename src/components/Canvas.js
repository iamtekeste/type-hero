import React from 'react';
import TextEditor from './TextEditor';
import PropTypes from 'prop-types';

const Canvas = ({ fontFamily, fontSize, fontWeight, textColor, backgroundColor }) => {
  const textStyle = {
    fontFamily: `${fontFamily} ${fontWeight}`,
    fontSize,
    fontWeight,
    color: textColor,
  };
  const canvasStyle = {
    backgroundColor,
  };

  return (
    <div style={canvasStyle} className="canvas">
      <TextEditor editorStyle={textStyle} />
    </div>
  );
};

Canvas.propTypes = {
  fontFamily: PropTypes.string.isRequired,
  fontWeight: PropTypes.string.isRequired,
  fontSize: PropTypes.string.isRequired,
  textColor: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string.isRequired,

};

export default Canvas;
