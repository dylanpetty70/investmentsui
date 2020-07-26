import React, {Component} from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Home from "./components/Home";
import Investments from "./components/Investments";
import Foresight from "./components/Foresight";
import Scanners from "./components/Scanners";
import Login from "./components/Login";
import RedirectPage from "./components/404";


class Router extends Component {
    render() {
      return (
        <div>
        <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/investments" component={Investments} />
                <Route path="/foresight" component={Foresight} />
                <Route path="/scanners" component={Scanners} />
                <Route path="/login" component={Login} />
                <Route path="/why-are-you-trying-to-break-my-site" component={RedirectPage} />
                <Redirect from="/*" to="/why-are-you-trying-to-break-my-site" />
        </Switch>
        </div>
      );
   }
}

export default Router;
