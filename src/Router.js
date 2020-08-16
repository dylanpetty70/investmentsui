import React, {Component} from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Home from "./components/Home";
import Models from "./components/Models";
import Login from "./components/Login";
import RedirectPage from "./components/404";


class Router extends Component {
    render() {
      return (
        <div>
        <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/models" component={Models} />
                <Route path="/login" component={Login} />
                <Route path="/why-are-you-trying-to-break-my-site" component={RedirectPage} />
                <Redirect from="/*" to="/why-are-you-trying-to-break-my-site" />
        </Switch>
        </div>
      );
   }
}

export default Router;
