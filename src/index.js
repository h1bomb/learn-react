import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";
import "./index.css";
import App from "./components/App";
import registerServiceWorker from "./registerServiceWorker";
import reducer from "./reducers";

const middleware = [thunk];
//使用 redux-devtools chrome插件
let composeEnhancers = compose;

// 开发状态使用日志中间件和redux-devtools
if (process.env.NODE_ENV !== "production") {
  middleware.push(createLogger());
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ||compose
}

//创建Store
const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(...middleware))
);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <div>
        <Route exact path="/" component={App} />
        <Route path="/:key" component={App} />
      </div>
    </Router>
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();

if (module.hot) {
  module.hot.accept();
}
