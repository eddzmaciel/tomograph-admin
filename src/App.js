import React, { Component } from "react";
import {
  HashRouter,
  Route,
  Switch,
  Redirect,
  DefaultRouteRedirect
} from "react-router-dom";
// import { renderRoutes } from 'react-router-config';
import Loadable from "react-loadable";
import "./App.scss";
import "@devexpress/dx-react-grid-bootstrap4/dist/dx-react-grid-bootstrap4.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";

import feathers from "./feathers";
import auth from "./auth";

const loading = () => (
  <div className="animated fadeIn pt-3 text-center">Loading...</div>
);

// Containers
const DefaultLayout = Loadable({
  loader: () => import("./containers/DefaultLayout"),
  loading
});

// Pages
const Login = Loadable({
  loader: () => import("./views/Pages/Login"),
  loading
});

const Register = Loadable({
  loader: () => import("./views/Pages/Register"),
  loading
});

const Page404 = Loadable({
  loader: () => import("./views/Pages/Page404"),
  loading
});

const Page500 = Loadable({
  loader: () => import("./views/Pages/Page500"),
  loading
});

class App extends Component {
  constructor(props) {
    super(props);
    var _this = this;
    this.state = {
      loading: true,
      loged: false
    };

    window.addEventListener("unhandledrejection", event => {
      console.log("event", event);
      if (
        event.reason.message === "No auth token" ||
        event.reason.message === "Authentication timed out" ||
        event.reason.message === "jwt expired"
      ) {
        _this.setState({
          loged: false,
          loading: false
        });
      }
    });

    feathers.on("logout", message => {
      console.log("logout event", message);
      _this.setState({
        loged: false
      });
    });

    feathers.on("authenticated", message => {
      _this.setState({
        loged: true
      });
    });

    this._authenticate();
  }

  _authenticate = async () => {
    await auth.authenticate();
    this.setState({
      loading: false,
      loged: true
    });
  };

  render() {
    return (
      <HashRouter>
        {this.state.loading ? (
          <div>Cargando...</div>
        ) : (
          <Switch>
            <Route
              exact
              path="/register"
              name="Register Page"
              component={Register}
            />
            <Route exact path="/404" name="Page 404" component={Page404} />
            <Route exact path="/500" name="Page 500" component={Page500} />
            {this.state.loged ? (
              <Route path="/" name="Inicio" component={DefaultLayout} />
            ) : (
              <Switch>
                <Route exact path="/" name="Login Page" component={Login} />
                <Redirect to="/" />
              </Switch>
            )}
          </Switch>
        )}
      </HashRouter>
    );
  }
}

export default App;
