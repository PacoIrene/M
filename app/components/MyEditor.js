import React, {Component} from 'react';
import {Editor, EditorState, ContentState} from 'draft-js';

export default class MyEditor extends Component {
  constructor(props) {
    super(props);
    const {content} = this.props;
    this.state = {editorState: EditorState.createWithContent(ContentState.createFromText(content))}
    this.onChange = (editorState) => {
      const currentContent = this.state.editorState.getCurrentContent().getPlainText();
      const nextContent = editorState.getCurrentContent().getPlainText();
      if (currentContent !== nextContent) {
        console.log('changed');
      }
      this.setState({editorState});
    }
  }
  render() {
    const {editorState} = this.state;
    return(
        <div className='editor'>
        <Editor
            editorState={editorState}
            onChange={this.onChange}
            ref="editor" />
        </div>
    );
  }
  setContent(content) {
    this.setState({
      editorState: EditorState.createWithContent(ContentState.createFromText(content))
    });
  }
}
