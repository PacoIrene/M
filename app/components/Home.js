import React, { Component } from 'react';
import { Link } from 'react-router';
import classNames from 'classNames';
import Tree from './Tree';
import EditorAndPreview from './EditorAndPreview';
import './Home.scss';


export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      treeWidth: 200
    };
  }

  render() {
    const {treeWidth} = this.state;
    return (
      <div className='container'>
        <Tree {...this.props.files}
          style={{
            width: treeWidth
          }}
          currentFilePath={this.props.currentFilePath}
          toggleExpandState={this.props.toggleExpandState}
          editable={this.props.editable}
          openFile={this.props.openFile} />
        <EditorAndPreview
          style={{
            marginLeft: treeWidth
          }}
          fileContent={this.props.fileContent}
          previewContent={this.props.previewContent}
          previewShow={this.props.previewShow}
          syncContent={this.props.syncContent}/>
      </div>
    );
  }
}
