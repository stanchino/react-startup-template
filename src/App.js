import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NavLink } from 'react-router-dom';
import { withRouter } from 'react-router';

import { logout } from "./auth/actions";
import routes from './routes';

import './App.css';

const App = ({ isLoggedIn, actions }) => [
    <nav key='menu'>
        <NavLink to='/'>Home</NavLink>
        <NavLink to='/public'>Public</NavLink>
        {isLoggedIn && <NavLink to='/private'>Private</NavLink>}
        {isLoggedIn && <NavLink to='/' onClick={actions.logout}>Logout</NavLink>}
        {isLoggedIn === false && <NavLink to='/login'>Login</NavLink>}
    </nav>,
    routes
];

const mapStateToProps = state => ({
    isLoggedIn: state.auth.isLoggedIn,
    profile: state.auth.profile
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({ logout }, dispatch),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));