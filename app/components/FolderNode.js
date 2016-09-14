import React, {Component} from 'react';
import classNames from 'classNames';
import _ from 'lodash';
import FileNode from './FileNode';
import 'icono/dist/icono.min.css';

export default class FolderNode extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {expanded, type, name, id, children, toggleExpandState, openFile, currentFilePath, depth} = this.props;

    let childrenNode = null;
    if (children) {
      const sortedChildren = _.orderBy(_.values(children), ['type', child => {
        return child.id && child.id.toLowerCase();
      }], ['desc', 'asc']);
      childrenNode = <ul className={'file-tree-folder-children ' + classNames({'hide': !expanded})}>
        {
          _.map(sortedChildren, (child, key) => {
            if (child.type === 'folder') {
              return (
                <li key={key}>
                  <FolderNode {...child}
                    currentFilePath={currentFilePath}
                    depth={depth + 1}
                    toggleExpandState={toggleExpandState}
                    openFile={openFile}></FolderNode>
                </li>
              );
            }
            else if (child.type === 'file') {
              return (
                <li key={key}>
                  <FileNode {...child}
                    depth={depth + 1}
                    selected={currentFilePath === child.id}
                    openFile={openFile}></FileNode>
                </li>
              );
            }
          })
        }
      </ul>;
    }

    return (
        <div className={'file-tree-folder ' + classNames({'expanded': expanded})}>
          <span
            className='folder-tree-title file-tree-title'
            onClick={this.expandChildren.bind(this)}
            style={{
              paddingLeft: 10 * depth
            }}>
            {name}
          </span>
          {childrenNode}
        </div>
    );
  }

  expandChildren(e) {
    const {id, name} = this.props;
    this.props.toggleExpandState(id, name);
  }
}
