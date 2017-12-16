import React from 'react';
import Protected, { Logout } from './auth/components';
import { NavLink } from 'react-router-dom';
import { Switch, Route, Redirect, withRouter } from 'react-router';

import { Home, Private, Public, NotFound } from './components';

import './App.css';

const App = () => (
    <div className='container'>
        <nav>
            <NavLink to='/' exact>Home</NavLink>
            <NavLink to='/public' exact>Public</NavLink>
            <NavLink to='/private' exact>Private</NavLink>
            <Protected component={null}><Logout className={'btn'}/></Protected>
            <Protected component={<NavLink to='/login' exact>Login</NavLink>}/>
        </nav>
        <Switch>
            <Route exact path={'/'} component={Home} />
            <Route path={'/public'} component={Public} />
            <Route path={'/private'} component={Private} />
            <Route path={'/login'}>
                <Protected>
                    <Redirect to={'/'}/>
                </Protected>
            </Route>
            <Route component={NotFound} />
        </Switch>
    </div>
);

export default withRouter(App);