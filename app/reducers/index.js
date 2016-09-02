import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import fileSystem from './fileSystem';

const rootReducer = combineReducers({
  fileSystem,
  routing
});

export default rootReducer;
