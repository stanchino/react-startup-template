import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { logout } from '../actions';

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({ logout }, dispatch),
});

const Logout = ({ actions, ...props }) => (
    <button {...props} onClick={actions.logout}>Logout</button>
);

export default connect(null, mapDispatchToProps)(Logout);