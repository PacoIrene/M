import {INITIAL_STATE, TOGGLE_EXPANDSTATE, OPEN_FILE, FILE_CONTENT_CHANGE, SYNC_CONTENT, SUCCESS_SAVE} from '../actions/file';
import _ from 'lodash';
import Immutable from 'immutable';

const initialState = Immutable.fromJS({
  currentFilePath: '',
  fileContent: '',
  previewContent: '',
  files: {
    name: '',
    id: '',
    children: {},
    type: 'folder'
  }
});

export default function fileSystem(state = initialState, action) {
  switch (action.type) {
    case INITIAL_STATE:
      return state.setIn(['files'], Immutable.fromJS({
        ...action.fileSystem,
        expanded: true
      }));
    case TOGGLE_EXPANDSTATE:
      const basePath = state.getIn(['files', 'id']);
      const changePaths = _.without(action.id.replace(basePath, '').split('/'), '');
      let pathArray = ['files', 'children'];
      let initialPath = basePath;
      _.forEach(changePaths, path =>{
        initialPath = `${initialPath}/${path}`;
        pathArray.push(initialPath);
        pathArray.push('children');
      });
      pathArray.pop();
      if (changePaths.length === 0) {
        return state.updateIn(['files', 'expanded'], val => !val);
      }
      return state.updateIn([...pathArray, 'expanded'], val => !val);
    case OPEN_FILE:
      return state.set('currentFilePath', action.id);
    case FILE_CONTENT_CHANGE:
      return state.set('fileContent', action.content).set('previewContent', action.content);
    case SYNC_CONTENT:
      return state.set('previewContent', action.content);
    case SUCCESS_SAVE:
      return state;
    default:
      return state;
  }
}
