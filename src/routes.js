import React from 'react';
import { Switch, Route } from 'react-router';

import { Home, Private, Public } from './components/index';

export default (
    <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/public" component={Public} />
        <Route path="/private" component={Private} />
    </Switch>
);