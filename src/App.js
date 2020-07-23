import React from 'react';
import './App.css';
import Router from "./Router";
import { BrowserRouter } from 'react-router-dom';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import reducer from './reducers';
import {composeWithDevTools} from 'redux-devtools-extension';
import Header from './Header/Header';
import WIP from './components/WIP';

const store = createStore(reducer, composeWithDevTools());

function App() {
  return (
    <div>
        <Provider store={store}>
        <BrowserRouter>
    	<div className="App">
          <header>
            <Header/>
          </header>
		</div>
                <WIP/>
                <Router/>
            </BrowserRouter>
        </Provider>
    </div>
  );
}

export default App;
