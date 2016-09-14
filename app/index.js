import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import routes from './routes';
import configureStore from './store/configureStore';
import './reset.css';
import './app.global.css';
import {ipcRenderer} from 'electron';
import {SUCCESS_SAVE, TOGGLE_PREVIEW} from './constants/actionTypes';

const store = configureStore();
const history = syncHistoryWithStore(hashHistory, store);

ipcRenderer.on('save', (event, message) => {
  const fileSystem = store.getState().fileSystem.toJS();
  const currentFilePath = fileSystem.currentFilePath;
  const fileContent = fileSystem.previewContent;
  ipcRenderer.send('savefile', JSON.stringify({
    currentFilePath,
    fileContent
  }));
});

ipcRenderer.on('successsave', (event, message) => {
  store.dispatch({
    type: SUCCESS_SAVE,
    path: message
  });
});

ipcRenderer.on('togglepreview', (event, message) => {
  store.dispatch({
    type: TOGGLE_PREVIEW
  });
});

render(
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>,
  document.getElementById('root')
);
