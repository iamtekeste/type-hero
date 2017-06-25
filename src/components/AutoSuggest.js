import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';
import WebFont from 'webfontloader';
import algoliasearch from 'algoliasearch';
import PropTypes from 'prop-types';
import FontSize from './FontSize';

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
  static generateVariants(variants) {
    const fontVariants = variants.map((variant, vindex) => (
      <option
        value={JSON.stringify(variant)}
        key={vindex}
      >
        {variant.weight} {variant.style}
      </option>
    ));
    return fontVariants;
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
      isLoading: true,
      errorHappend: false,
      value: '',
      suggestions: [{ family: 'Loading' }],
      selectedFontVariants: [],
      fontSize: '24',
    };
    this.handleChange = this.handleChange.bind(this);
    this.updateSuggestions = this.updateSuggestions.bind(this);
    this.onSuggestionSelected = this.onSuggestionSelected.bind(this);
    this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this);
    this.updateFontVariant = this.updateFontVariant.bind(this);
    this.updateFontSize = this.updateFontSize.bind(this);
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
      if (err) {
        this.setState({
          errorHappend: true,
          isLoading: false,
        });
        return;
      }
      this.setState({
        isLoading: false,
        suggestions: content.hits,
      });
    });
  }
  updateFontVariant(event) {
    const value = event.target.value;
    const variant = JSON.parse(value);
    this.props.updateFontVariant(variant);
  }
  updateFontSize(event) {
    const fontSize = event.target.value;
    this.setState({
      fontSize,
    });
    let santizedFontSize = parseInt(fontSize, 10);
    santizedFontSize = santizedFontSize !== santizedFontSize ? 34 : santizedFontSize;
    this.props.updateFontSize(santizedFontSize);
  }
  render() {
    const { isLoading, errorHappend, value, suggestions, selectedFontVariants, fontSize } = this.state;
    const variants = Algo.generateVariants(selectedFontVariants);

    // only display the style selector only if they have selected a font
    let selectVariants = '';
    let defaultValues = [
      {
        weight: 400,
        style: 'normal',
      },
      {
        weight: 700,
        style: 'normal',
      },
    ];
    defaultValues = defaultValues.map(val => (
      <option value={JSON.stringify(val)} key={val.weight + val.style}>{val.weight}</option>
    ));
    selectVariants =
      (
        <select onChange={this.updateFontVariant}>
          {defaultValues}
          {variants}
        </select>
      );

    return (
      <div>
        { errorHappend ? <div className="error">Refresh the page.</div> : <div className="no-error">
          {
            isLoading ? <p>Loading Fonts...</p> :
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
          }
        </div>
         }
        <div className="variants">
          {selectVariants}
        </div>
        <FontSize defaultFontSize={fontSize} onChange={this.updateFontSize} />
      </div>
    );
  }
}

Algo.propTypes = {
  updateFontFamily: PropTypes.func.isRequired,
  updateFontVariant: PropTypes.func.isRequired,
  updateFontSize: PropTypes.func.isRequired,
};
