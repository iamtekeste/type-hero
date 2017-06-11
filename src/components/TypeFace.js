import React, { Component } from 'react';
import WebFont from 'webfontloader';
import PropTypes from 'prop-types';
import AutoSuggest from './AutoSuggest';

const fontFamilies = new Set();

export default class TypeFace extends Component {
  static fetchFont(newVal) {
    fontFamilies.add(newVal);
    WebFont.load({
      google: {
        families: Array.from(fontFamilies),
      },
    });
  }

  constructor(props) {
    super(props);
    this.state = {
      fontFamily: 'Montserrat',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(newVal) {
    this.setState({ fontFamily: newVal });
    this.props.handleChange(newVal);
    TypeFace.fetchFont(newVal);
  }

  render() {
    return (
      <div>
        <AutoSuggest handleChange={this.handleChange} />
      </div>
    );
  }
}

TypeFace.propTypes = {
  handleChange: PropTypes.func.isRequired,
};
