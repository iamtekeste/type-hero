import React from 'react';
import PropTypes from 'prop-types';
import closeIcon from '../images/close.svg';
import openIcon from '../images/open.svg';

export default function Hamburger(props) {
  const icon = props.isOpen ? closeIcon : openIcon;
  const handler = (event) => {
    event.preventDefault();
    props.openSidebar();
  };

  return (
    <div>
      {!props.isOpen ? <div className="hint">Open the menu to select Google fonts & change colors.</div> : '' }
      <button className="open-menu-icon" onClick={handler} >
        <img src={icon} alt="open-close-sidebar" />
      </button>
    </div>
  );
}

Hamburger.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  openSidebar: PropTypes.func.isRequired,
};
