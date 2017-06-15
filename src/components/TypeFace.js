import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AutoSuggest from './AutoSuggest';


export default class TypeFace extends Component {
  render() {
    return (
      <div>
        <AutoSuggest updateFontFamily={this.props.updateFontFamily} updateFontVariant={this.props.updateFontVariant} />
      </div>
    );
  }
}

TypeFace.propTypes = {
  updateFontFamily: PropTypes.func.isRequired,
  updateFontVariant: PropTypes.func.isRequired,
};
