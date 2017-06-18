import React from 'react';
import PropTypes from 'prop-types';


export default function fontSize({ defaultFontSize, onChange }) {
  const defaultValues = [9, 10, 11, 12, 13, 14, 18, 24, 36, 48, 64, 72, 96, 144, 288];
  const fontSizeSelect = defaultValues.map(value => (
    <option value={value} key={value}>{value}</option>
  ));
  return (
    <div className="font-size">
      <input type="text" list="fontsizes" onChange={onChange} value={defaultFontSize} />
      <select id="fontsizes" onChange={onChange}>{fontSizeSelect}</select>
    </div>
  );
}

fontSize.propTypes = {
  onChange: PropTypes.func.isRequired,
  defaultFontSize: PropTypes.string.isRequired,
};
