import React from 'react';
import { connect } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { NavLink } from 'react-router-dom';
import { bindActionCreators } from 'redux';

import { loginRequest, logout } from "./auth/reducers";

import routes from './routes';
import './App.css';

const App = ({ history, auth, actions }) => (
    <ConnectedRouter history={history}>
        <div>
            <nav key={'navigation'}>
                <NavLink to={'/'}>Home</NavLink>
                <NavLink to={'/public'}>Public</NavLink>
                {auth.isLoggedIn && <NavLink to={'/private'}>Private</NavLink>}
            </nav>
            {auth.isLoggedIn === false && <button onClick={actions.loginRequest}>Login</button>}
            {auth.isLoggedIn && <button onClick={actions.logout}>Logout</button>}
            {routes}
        </div>
    </ConnectedRouter>
);

const mapStateToProps = (state) => ({
    auth: state.auth
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({ loginRequest, logout }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);