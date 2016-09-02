import React, { Component } from 'react';
import Home from '../components/Home';
import {connect} from 'react-redux';
import Immutable from 'immutable';
import {ipcRenderer} from 'electron';

import {initialState, toggleExpandState, openFile} from '../actions/file';
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
    const actions = bindActionCreators({toggleExpandState}, dispatch);
    const mutableFiles = files.toJS();
    return (
      <Home files={mutableFiles.files}
        currentFilePath={mutableFiles.currentFilePath}
        fileContent={mutableFiles.fileContent}
        toggleExpandState={actions.toggleExpandState}
        openFile={this.handleOpenFile.bind(this)} />
    );
  }

  handleOpenFile(id) {
    const {dispatch} = this.props;
    ipcRenderer.send('openfile', id);
    dispatch(openFile(id));
  }
}

export default connect(
  state => ({files: state.fileSystem})
)(HomePage);
