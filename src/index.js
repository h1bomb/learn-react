import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";
import "./index.css";
import App from "./components/App";
import registerServiceWorker from "./registerServiceWorker";
import reducer from "./reducers";
import ApolloClient from "apollo-boost";
import gql from "graphql-tag";
import { ApolloProvider,Query } from "react-apollo";
import Dogs from "./components/App/Dogs";

const middleware = [thunk];
//使用 redux-devtools chrome插件
let composeEnhancers = compose;

// 开发状态使用日志中间件和redux-devtools
if (process.env.NODE_ENV !== "production") {
  middleware.push(createLogger());
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ||compose
}
const client = new ApolloClient({
  uri: "https://w5xlvm3vzz.lp.gql.zone/graphql"
});

//创建Store
const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(...middleware))
);

const ExchangeRates = () => (
  <ApolloProvider client={client}>
  <Query
    query={gql`
      {
        rates(currency: "USD") {
          currency
          rate
        }
      }
    `}
  >
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;

      return data.rates.map(({ currency, rate }) => (
        <div key={currency}>
          <p>{`${currency}: ${rate}`}</p>
        </div>
      ));
    }}
  </Query>
  </ApolloProvider>
);

ReactDOM.render(
  
  <Provider store={store}>
    <Router>
      <Switch>
        <Route exact path="/graphql" component={ExchangeRates}/>
        <Route path="/dogs" component={Dogs} />
        <Route exact path="/" component={App} />
        <Route path="/:key" component={App} />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();

if (module.hot) {
  module.hot.accept();
}
