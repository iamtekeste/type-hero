import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import TextStyler from './TextStyler';
import Credits from './Credits';
const SideBar = (props) => {
  const handlers = props.handlers;
  const openClass = props.isOpen ? 'sidebar--open' : '';

  return (
    <div className={`sidebar ${openClass}`}>
      <Header />
      <div className="tools">
        <TextStyler handlers={handlers} />
      </div>
      <Credits />
    </div>
  );
};

SideBar.propTypes = {
  handlers: PropTypes.shape({
    updateFontFamily: PropTypes.func,
    updateFontVariant: PropTypes.func,
    updateFontSize: PropTypes.func,
    updateTextColor: PropTypes.func,
    updateBackgroundColor: PropTypes.func,
  }).isRequired,
  isOpen: PropTypes.bool.isRequired,
};

export default SideBar;
