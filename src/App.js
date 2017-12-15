import React from 'react';
import { connect } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { NavLink } from 'react-router-dom';

import { logout } from "./auth/actions";

import components from './routes';
import './App.css';

const App = ({ history, isLoggedIn, actions }) => (
    <ConnectedRouter history={history}>
        <div>
            <nav>
                <NavLink to='/'>Home</NavLink>
                <NavLink to='/public'>Public</NavLink>
                {isLoggedIn && <NavLink to='/private'>Private</NavLink>}
                {isLoggedIn && <NavLink to='/' onClick={actions.logout}>Logout</NavLink>}
                {isLoggedIn === false && <NavLink to='/login'>Login</NavLink>}
            </nav>
            {components}
        </div>
    </ConnectedRouter>
);

const mapStateToProps = state => ({
    isLoggedIn: state.auth.isLoggedIn,
    profile: state.auth.profile
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({ logout }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);