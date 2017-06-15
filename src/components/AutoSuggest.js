import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';
import WebFont from 'webfontloader';
import algoliasearch from 'algoliasearch';
import PropTypes from 'prop-types';

const appId = 'C1WF35DCV6';
const apiKey = 'b10e0666dc9b73ce201bf1a3d336055d';
const indexName = 'google_fonts';

const client = algoliasearch(appId, apiKey);
const index = client.initIndex(indexName);

export default class Algo extends Component {
  static fetchFont(fontFamily, fontVariants) {
    const fontRequest = `${fontFamily}:${fontVariants}`;
    WebFont.load({
      google: {
        families: [fontRequest],
      },
    });
  }
  static formatVariants(variants) {
    const formatted = variants.map((variant) => {
      const fontInfo = {};
      fontInfo.weight = parseInt(variant.match(/\d+/) ? variant.match(/\d+/)[0] : 400, 10);
      let style = variant.match(/[A-Za-z]/g);
      style = style ? style.join('') : '';
      style = style === 'regular' ? '' : style;
      fontInfo.style = style;
      return fontInfo;
    });
    return formatted;
  }
  static getFontWeights(variants) {
    const variantsString = variants.join(',');
    return variantsString;
  }
  constructor(props) {
    super(props);
    this.state = {
      value: 'Roboto',
      suggestions: [{ family: 'Loading' }],
      selectedFontVariants: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.updateSuggestions = this.updateSuggestions.bind(this);
    this.onSuggestionSelected = this.onSuggestionSelected.bind(this);
    this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this);
    this.updateFontVariant = this.updateFontVariant.bind(this);
  }
  componentDidMount() {
    this.updateSuggestions({ value: '' });
  }
  onSuggestionSelected(event, { suggestion, suggestionValue }) {
    const variants = suggestion.variants ? suggestion.variants : [];
    const formattedVariants = Algo.formatVariants(variants);
    this.setState({ selectedFontVariants: formattedVariants });
    // load the fonts from Google Fonts
    const variantsString = Algo.getFontWeights(variants);
    Algo.fetchFont(suggestionValue, variantsString);
    this.props.updateFontFamily(suggestionValue);
  }
  onSuggestionsClearRequested() {
    this.setState({
      suggestions: [],
    });
  }
  handleChange(event, { newValue }) {
    this.setState({
      value: newValue,
    });
  }
  updateSuggestions(searchObject) {
    index.search(searchObject.value, (err, content) => {
      const firstFontVariants = content.hits[0].variants;
      const formattedVariants = Algo.formatVariants(firstFontVariants);
      this.setState({
        suggestions: content.hits,
        selectedFontVariants: formattedVariants,
      });
    });
  }
  updateFontVariant(event) {
    const variant = JSON.parse(event.target.value);
    this.props.updateFontVariant(variant);
  }
  render() {
    const { value, suggestions, selectedFontVariants } = this.state;
    const variants = selectedFontVariants.map((variant, vindex) => (
      <option
        value={JSON.stringify(variant)}
        key={vindex}
      >
        {variant.weight} {variant.style}
      </option>
    ));
    return (
      <div>
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.updateSuggestions}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          onSuggestionSelected={this.onSuggestionSelected}
          getSuggestionValue={typeface => typeface.family}
          shouldRenderSuggestions={() => true}
          highlightFirstSuggestion
          renderSuggestion={typeface => (
            <div>
              <div>{typeface.family}</div>
            </div>
          )}
          inputProps={{
            placeholder: 'Search Google fonts',
            value,
            onChange: this.handleChange,
          }}
        />
        <div className="variants">
          <select name="variants" id="variants" onChange={this.updateFontVariant}>
            {variants}
          </select>
        </div>
      </div>
    );
  }
}

Algo.propTypes = {
  updateFontFamily: PropTypes.func.isRequired,
  updateFontVariant: PropTypes.func.isRequired,
};
