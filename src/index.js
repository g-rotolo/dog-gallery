import React from "react";
import ReactDOM from "react-dom";
import Photos from "./container/Photos";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers/index";
import "./index.css";
import "./container/Photos.css";
import "./component/PhotoTab.css";

const store = createStore(rootReducer, applyMiddleware(thunk));

class App extends React.Component {
  render() {
    return <Photos />;
  }
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
