import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { signOutRoutine } from "../actions";

const Logout = ({ isLoggedIn, children, actions, ...props }) => (
    isLoggedIn ? <button {...props} onClick={actions.signOutRoutine}>{children}</button> : null
);

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({ signOutRoutine }, dispatch),
});

export default connect(state => ({
    isLoggedIn: state.auth.signIn.isLoggedIn,
}), mapDispatchToProps)(Logout);