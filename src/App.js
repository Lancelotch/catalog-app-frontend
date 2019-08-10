import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect
} from "react-router-dom";
import routes from "./routes/routes";

function App() {
  return (
    <Router>
      <Route exact path="/" component={() => <Redirect to="/products" />} />
      {routes.map(({ path, component }) => (
        <Route key={path} path={path} component={component} />
      ))}
    </Router>
  );
}

export default App;
