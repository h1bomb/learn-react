import React from 'react';
import ReactDOM from 'react-dom';
import {
    createStore,
    applyMiddleware
} from 'redux';
import {
    Provider
} from 'react-redux';
import thunk from 'redux-thunk';
import {
    createLogger
} from 'redux-logger';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import reducer from './reducers'

const middleware = [thunk];

if (process.env.NODE_ENV !== 'production') {
    middleware.push(createLogger());
}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
const store = createStore(
    reducer,
    composeEnhancers(applyMiddleware(...middleware)),
);

ReactDOM.render( 
  <Provider store={store}>
    <App />
  </Provider>,
 document.getElementById('root'));
registerServiceWorker();

if (module.hot) {
    module.hot.accept();
}