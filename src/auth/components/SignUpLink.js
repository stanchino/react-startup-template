import React from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";

const RegisterLink = ({ isLoggedIn, isRegistered, dispatch, ...props }) => (
    isRegistered || isLoggedIn ? null : <NavLink {...props} />
);

const mapStateToProps = state => ({
    isLoggedIn: state.auth.signIn.isLoggedIn,
    isRegistered: state.auth.signUp.isLoggedIn
});

export default connect(mapStateToProps)(RegisterLink);