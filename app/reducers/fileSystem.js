import * as types from '../constants/actionTypes';
import _ from 'lodash';
import Immutable from 'immutable';

const initialState = Immutable.fromJS({
  currentFilePath: '',
  fileContent: '',
  previewContent: '',
  newFile: false,
  files: {
    name: '',
    id: '',
    children: {},
    type: 'folder'
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
      return state.set('currentFilePath', action.id).set('newFile', false);
    case types.FILE_CONTENT_CHANGE:
      return state.set('fileContent', action.content).set('previewContent', action.content);
    case types.SYNC_CONTENT:
      return state.set('previewContent', action.content);
    case types.SUCCESS_SAVE:
      const path = action.path;
      // TODO: 如果新增的path没有 那么就要更新tree的节点了
      return state;
    case types.CREATE_FILE:
      return state.set('newFile', true)
                  .set('currentFilePath', '')
                  .set('fileContent', '')
                  .set('previewContent', '');
    default:
      return state;
  }
}
