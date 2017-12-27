import React from 'react';
import { ConnectedRouter } from 'react-router-redux';
import { SignUpLink, SignUpForm, SignInLink, SignInForm, SignOutLink, Protected } from './auth/components';
import { NavLink } from 'react-router-dom';
import { Switch, Route, Redirect } from 'react-router';

import { Home, Private, Public, NotFound } from './components';

import './App.css';

const RouteWithRedirect = ({ component, path , redirect = '/' }) => (
    <Route path={path}>
        <Protected component={component}>
            <Redirect to={'/'}/>
        </Protected>
    </Route>
);

export default ({ history }) => (
    <ConnectedRouter history={history}>
        <div className='container'>
            <nav>
                <NavLink to='/' exact>Home</NavLink>
                <NavLink to='/public' exact>Public</NavLink>
                <NavLink to='/private' exact>Private</NavLink>
                <SignInLink to='/login' exact>Login</SignInLink>
                <SignUpLink to='/register' exact>Register</SignUpLink>
                <SignOutLink className={'btn'}>Logout</SignOutLink>
            </nav>
            <Switch>
                <Route exact path={'/'} component={Home} />
                <Route path={'/public'} component={Public} />
                <Route path={'/private'} component={Private} />
                <RouteWithRedirect path={'/login'} component={<SignInForm />} />
                <RouteWithRedirect path={'/register'} component={<SignUpForm />} />
                <Route component={NotFound} />
            </Switch>
        </div>
    </ConnectedRouter>
);