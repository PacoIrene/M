import * as types from '../constants/actionTypes';
import _ from 'lodash';
import Immutable from 'immutable';

const initialState = Immutable.fromJS({
  currentFilePath: '',
  fileContent: '',
  previewContent: '',
  previewShow: false,
  files: {
    name: '',
    id: '',
    children: {},
    type: ''
  }
});

export default function fileSystem(state = initialState, action) {
  const basePath = state.getIn(['files', 'id']);
  switch (action.type) {
    case types.INITIAL_STATE:
      return state.setIn(['files'], Immutable.fromJS({
        ...action.fileSystem,
        expanded: true
      }));
    case types.TOGGLE_EXPANDSTATE:
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
    case types.OPEN_FILE:
      return state.set('currentFilePath', action.id);
    case types.FILE_CONTENT_CHANGE:
      return state.set('fileContent', action.content).set('previewContent', action.content);
    case types.SYNC_CONTENT:
      return state.set('previewContent', action.content);
    case types.SUCCESS_SAVE:
      return state;
    case types.TOGGLE_PREVIEW:
      return state.updateIn(['previewShow'], val => !val);
    default:
      return state;
  }
}
