import React, {Component} from 'react';
import FolderNode from './FolderNode';
import './Tree.scss';

export default class Tree extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {name, type, children, id, expanded, currentFilePath} = this.props;

        const sys = {id, name, expanded, type, children, currentFilePath,
            toggleExpandState: this.props.toggleExpandState,
            openFile: this.props.openFile
        };

        return (
            <div className='file-tree-system'>
                <FolderNode {...sys}/>
            </div>
        );
    }
}
