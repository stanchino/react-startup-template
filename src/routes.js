import React from 'react';
import { Switch, Route } from 'react-router';

import { Home, Private, Public, Login, NotFound } from './components/index';

export default (
    <Switch key='router'>
        <Route exact path={'/'} component={Home} />
        <Route path={'/public'} component={Public} />
        <Route path={'/private'} component={Private} />
        <Route path={'/login'} component={Login} />
        <Route component={NotFound} />
    </Switch>
);