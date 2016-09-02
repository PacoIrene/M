import React, {Component} from 'react';
import classNames from 'classNames';

export default class FileNode extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {type, name, id, selected} = this.props;

        return (
            <div className={'file-tree-file ' + classNames({'file-selected': selected})}>
                <span className='file-tree-title' onClick={this.openFile.bind(this)}>{name}</span>
            </div>
        );
    }

    openFile(e) {
        if (!this.props.selected) {
            this.props.openFile(this.props.id);
        }
    }
}
