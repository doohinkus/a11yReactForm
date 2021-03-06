import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { debugContextDevtool } from 'react-context-devtool';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { initialState, formReducer } from "./state/form.duck";
import { StateProvider } from "./state/state.provider";

const container = document.getElementById('root');

ReactDOM.render(
  <StateProvider initialState={initialState} reducer={formReducer}>
    <App />
  </StateProvider>,
  container
);
debugContextDevtool(container);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
