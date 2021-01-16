import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";

import Home from "./pages/Home";
import Poll from "./pages/Poll";
import NoMatch from "./pages/NoMatch";

import store from "./store";
import GlobalStyle from "./globalStyles";


function App() {
  return (
    <Provider store={store}>
      <GlobalStyle />
      <Router>
        <div>
          <Switch>
            <Route exact path={"/"} component={Home} />
            <Route path={"/poll/:id"} component={Poll} />
            <Route component={NoMatch} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
