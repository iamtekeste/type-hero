import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import TextStyler from './TextStyler';

const SideBar = (props) => {
  const handlers = props.handlers;

  return (
    <div className="sidebar">
      <Header />
      <div className="tools">
        <TextStyler handlers={handlers} />
      </div>
    </div>
  );
};

SideBar.propTypes = {
  handlers: PropTypes.shape({
    updateFontFamily: PropTypes.func,
    updateFontVariant: PropTypes.func,
    updateFontSize: PropTypes.func,
    updateTextColor: PropTypes.func,
  }).isRequired,
};

export default SideBar;
