import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Editor, Raw } from 'slate';

const initialState = Raw.deserialize({
  nodes: [
    {
      kind: 'block',
      type: 'paragraph',
      nodes: [
        {
          kind: 'text',
          text: '',
        },
      ],
    },
  ],
}, { terse: true });

export default class TextEditor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      state: initialState,
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange(state) {
    this.setState({ state });
  }

  render() {
    return (
      <Editor
        className="text-editor"
        placeholder="Type something"
        placeholderStyle={{ color: '#aba6b1' }}
        style={this.props.editorStyle}
        state={this.state.state}
        onChange={this.onChange}
        autoFocus
      />
    );
  }
}

TextEditor.propTypes = {
  editorStyle: PropTypes.object.isRequired,
};
