import React from 'react';
import { Switch, Route, Redirect } from 'react-router';

import { Home, Private, Public, Login, NotFound } from './components/index';

const Routes = ({ isLoggedIn }) => (
    <Switch>
        <Route exact path={'/'} component={Home} />
        <Route path={'/public'} component={Public} />
        <Route path={'/private'} component={Private} />
        <Route path={'/login'} render={() => isLoggedIn ? <Redirect to={'/'} /> : <Login/> } />
        <Route path={'*'} component={NotFound} />
    </Switch>
);

export default Routes;