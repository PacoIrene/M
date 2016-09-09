import React, { Component } from 'react';
import Home from '../components/Home';
import {connect} from 'react-redux';
import Immutable from 'immutable';
import {ipcRenderer} from 'electron';

import {initialState, toggleExpandState, openFile, syncContent} from '../actions/file';
import {bindActionCreators} from 'redux';

class HomePage extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const {dispatch} = this.props;
    const actions = bindActionCreators({initialState}, dispatch);
    actions.initialState();
  }
  render() {
    const {files, dispatch} = this.props;
    const actions = bindActionCreators({toggleExpandState, syncContent}, dispatch);
    const mutableFiles = files.toJS();
    return (
      <Home files={mutableFiles.files}
        currentFilePath={mutableFiles.currentFilePath}
        fileContent={mutableFiles.fileContent}
        previewContent={mutableFiles.previewContent}
        newFile={mutableFiles.newFile}
        toggleExpandState={actions.toggleExpandState}
        syncContent={actions.syncContent}
        openFile={this.handleOpenFile.bind(this)} />
    );
  }

  handleOpenFile(id) {
    const {dispatch} = this.props;
    if (!id) {
      return;
    }
    ipcRenderer.send('openfile', id);
    dispatch(openFile(id));
  }
}

export default connect(
  state => ({files: state.fileSystem})
)(HomePage);
