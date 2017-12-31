import React from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";

const LoginLink = ({ isLoggedIn, dispatch, ...props }) => (
    isLoggedIn ? null : <NavLink {...props} />
);

const mapStateToProps = state => ({
    isLoggedIn: state.auth.signIn.isLoggedIn,
});

export default connect(mapStateToProps)(LoginLink);