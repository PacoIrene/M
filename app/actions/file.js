import {ipcRenderer} from 'electron';
import * as types from '../constants/actionTypes';

export function openFile(id) {
  return {
    type: types.OPEN_FILE,
    id
  };
}

export function changeFileContent(content) {
  return {
    type: types.FILE_CONTENT_CHANGE,
    content
  }
}

export function initial(fileSystem) {
  return {
    type: types.INITIAL_STATE,
    fileSystem
  };
}

export function toggleExpandState(id, name) {
  return {
    type: types.TOGGLE_EXPANDSTATE,
    id,
    name
  };
}

export function syncContent(content) {
  return dispatch => {
    setTimeout(() => {
      dispatch(syncContentInfo(content));
    }, 500);
  }
}

export function syncContentInfo(content) {
  return {
    type: types.SYNC_CONTENT,
    content
  }
}

export function initialState() {
  return dispatch => {
    ipcRenderer.on('loadfiles', (event, message) => {
      dispatch(initial(JSON.parse(message)));
    });
    ipcRenderer.on('readfilecontent', (event, message) => {
      dispatch(changeFileContent(message));
    });
  }
}
