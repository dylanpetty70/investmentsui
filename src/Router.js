import React, {Component} from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from "./components/Home";
import Investments from "./components/Investments";
import Foresight from "./components/Foresight";
import Scanners from "./components/Scanners";
import Login from "./components/Login";


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
        </Switch>
        </div>
      );
   }
}

export default Router;
