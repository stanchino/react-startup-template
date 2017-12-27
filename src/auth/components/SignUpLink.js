import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

const RegisterLink = ({ isLoggedIn, isRegistered, dispatch, ...props }) => (
    isRegistered || isLoggedIn ? null : <NavLink {...props} />
);

const mapStateToProps = state => ({
    isLoggedIn: state.auth.isLoggedIn,
    isRegistered: state.auth.isLoggedIn
});

export default connect(mapStateToProps)(RegisterLink);