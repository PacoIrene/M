import {ipcRenderer} from 'electron';

export const INITIAL_STATE = 'INITIAL_STATE';

export const TOGGLE_EXPANDSTATE = 'TOGGLE_EXPANDSTATE';

export const OPEN_FILE = 'OPEN_FILE';

export const FILE_CONTENT_CHANGE = 'FILE_CONTENT_CHANGE';

export const SYNC_CONTENT = 'SYNC_CONTENT';

export function openFile(id) {
  return {
    type: OPEN_FILE,
    id
  };
}

export function changeFileContent(content) {
  return {
    type: FILE_CONTENT_CHANGE,
    content
  }
}

export function initial(fileSystem) {
  return {
    type: INITIAL_STATE,
    fileSystem
  };
}

export function toggleExpandState(id, name) {
  return {
    type: TOGGLE_EXPANDSTATE,
    id,
    name
  };
}

export function syncContent(content) {
  return {
    type: SYNC_CONTENT,
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
