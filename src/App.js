import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect
} from "react-router-dom";
import routes from "./routes";

function App() {
  const RouteWithLayout = ({ component: Component, layout: Layout, ...rest }) => (
    <Route {...rest} render={props => (
      <Layout>
        <Component {...props} />
      </Layout>
    )} />
  );

  return (
    <Router>
      <Route exact path="/" component={() => <Redirect to="/products" />} />
      {routes.map(({ path, component, layout }) => (
        <RouteWithLayout key={path} path={path} component={component} layout={layout}/>
      ))}
    </Router>
  );
}

export default App;