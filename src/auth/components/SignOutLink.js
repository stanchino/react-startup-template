import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { logout } from "../actions";

const Logout = ({ isLoggedIn, children, actions, ...props }) => (
    isLoggedIn ? <button {...props} onClick={actions.logout}>{children}</button> : null
);

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({ logout }, dispatch),
});

export default connect(state => ({
    isLoggedIn: state.auth.isLoggedIn,
}), mapDispatchToProps)(Logout);