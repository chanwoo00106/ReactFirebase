import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Profile from 'routes/Profile';
import Auth from '../routes/Auth';
import Home from '../routes/Home';
import Navigation from './Navigation';

const AppRouter = ({isLoggedIn}) => {
    return (
        <Router>
            {isLoggedIn && <Navigation />}
            {isLoggedIn ?
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route exact path="/profile" component={Profile} />
                </Switch>
                    :
                <Route exact path="/" component={Auth}/>
            }
        </Router>
    )
}

export default AppRouter;