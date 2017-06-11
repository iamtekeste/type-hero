import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';
import algoliasearch from 'algoliasearch';
import PropTypes from 'prop-types';

const appId = 'C1WF35DCV6';
const apiKey = 'b10e0666dc9b73ce201bf1a3d336055d';
const indexName = 'google_fonts';

const client = algoliasearch(appId, apiKey);
const index = client.initIndex(indexName);
export default class Algo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      suggestions: [{ family: 'Loading' }],
    };
    this.handleChange = this.handleChange.bind(this);
    this.updateSuggestions = this.updateSuggestions.bind(this);
    this.onSuggestionSelected = this.onSuggestionSelected.bind(this);
    this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this);
  }
  componentDidMount() {
    this.updateSuggestions({ value: '' });
  }
  onSuggestionSelected(event, { suggestionValue }) {
    this.props.handleChange(suggestionValue);
  }
  onSuggestionsClearRequested() {
    this.state.suggestions = [];
  }
  handleChange(event, { newValue }) {
    this.setState({
      value: newValue,
    });
  }
  updateSuggestions(searchObject) {
    index.search(searchObject.value, (err, content) => {
      this.setState({
        suggestions: content.hits,
      });
    });
  }
  render() {
    const { value, suggestions } = this.state;
    return (
      <form action="#">
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
      </form>
    );
  }
}

Algo.propTypes = {
  handleChange: PropTypes.func.isRequired,
};
