import React,{Component} from 'react';
import MyEditor from './MyEditor';
import './EditorAndPreview.scss';
import './markdown.scss';
import marked from 'marked';

export default class EditorAndPreview extends Component {
    componentWillReceiveProps(nextProps) {
        if (nextProps.fileContent !== '' && this.refs.editor && nextProps.fileContent === nextProps.previewContent) {
            this.refs.editor.setContent(nextProps.fileContent);
        }
    }
    render() {
        let editor = null
        let preview  = null;
        const content = this.props.fileContent;
        if (content !== '') {
            editor = <MyEditor content={content} ref='editor' syncContent={this.props.syncContent}></MyEditor>;
        }
        if (this.props.previewContent !== '') {
          preview = <div className="preview markdown-body" dangerouslySetInnerHTML={{__html: marked(this.props.previewContent)}}></div>;
        }

        return (
            <div className='editorContainer'>
                {editor}
                {preview}
            </div>);
    }
}
