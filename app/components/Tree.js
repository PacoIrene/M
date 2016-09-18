import React, {Component} from 'react';
import FolderNode from './FolderNode';
import FileNode from './FileNode';
import './Tree.scss';

export default class Tree extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {name, type, children, id, expanded, currentFilePath} = this.props;

    const sys = {id, name, expanded, type, children, currentFilePath,
      toggleExpandState: this.props.toggleExpandState,
      openFile: this.props.openFile,
      editable: this.props.editable
    };

    let contentNode = null;
    if (type === 'file') {
      contentNode = <FileNode {...sys}
        selected={currentFilePath === id} depth={1}></FileNode>
    }
    else if (type === 'folder') {
      contentNode = <FolderNode {...sys} depth={1}/>
    }

    return (
      <div
          className='file-tree-system'
          style={this.props.style}>
        {contentNode}
      </div>
    );
  }
}
