import React, { Component } from 'react';
import { Link } from 'react-router';
import classNames from 'classNames';
import Tree from './Tree';
import EditorAndPreview from './EditorAndPreview';
import './Home.scss';


export default class Home extends Component {
  render() {
    return (
      <div className='container'>
            <Tree {...this.props.files}
                currentFilePath={this.props.currentFilePath}
                toggleExpandState={this.props.toggleExpandState}
                openFile={this.props.openFile} />
            <EditorAndPreview fileContent={this.props.fileContent}/>
      </div>
    );
  }
}
