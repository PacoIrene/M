import React,{Component} from 'react';
import MyEditor from './MyEditor';
import './EditorAndPreview.scss';
import './markdown.scss';
import marked from 'marked';

export default class EditorAndPreview extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.fileContent !== '' && this.refs.editor
      && nextProps.fileContent === nextProps.previewContent) {
      this.refs.editor.setContent(nextProps.fileContent);
    }
  }
  render() {
    let editor = null
    let preview  = null;
    const content = this.props.fileContent;
    const previewShow = this.props.previewShow;
    if (content !== '') {
      editor = <MyEditor style={{width: previewShow ? '50%': '100%'}} content={content} ref='editor' syncContent={this.props.syncContent}></MyEditor>;
    }
    if (this.props.previewContent !== '' && previewShow) {
      preview = <div style={{width: '50%'}} className="preview markdown-body" onClick={(e) => {e.preventDefault();}}dangerouslySetInnerHTML={{__html: marked(this.props.previewContent)}}></div>;
    }

    return (
      <div
        className='editorContainer'
        style={this.props.style}>
        {editor}
        {preview}
      </div>);
  }
}
