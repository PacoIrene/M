import React, { Component } from 'react';
import { Link } from 'react-router';
import classNames from 'classNames';
import Tree from './Tree';
import EditorAndPreview from './EditorAndPreview';
import Rnd from 'react-rnd';
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
          openFile={this.props.openFile} />
        <Rnd
          initial={{
            x: 200,
            y: 0,
            width: 1,
            height: window.innerHeight,
          }}
          bounds={'parent'}
          className='draggable-bound'
          isResizable={{
            top:false,
            right:false,
            bottom:false,
            left:false,
            topRight:false,
            bottomRight:false,
            bottomLeft:false,
            topLeft:false
          }}
          moveAxis='x'
          onDrag={this.resizeBound.bind(this)}></Rnd>
        <EditorAndPreview
          style={{
            marginLeft: treeWidth
          }}
          fileContent={this.props.fileContent}
          previewContent={this.props.previewContent}
          syncContent={this.props.syncContent}/>
      </div>
    );
  }

  resizeBound(event, ui) {
    const {left} = ui.position;
    this.setState({
      treeWidth: left
    });
  }
}
