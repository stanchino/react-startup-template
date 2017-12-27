import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { logout } from '../actions';
import mapStateToProps from '../reducers/stateToProps';

const Logout = ({ isLoggedIn, isRegistered, isConfirmed, children, actions, ...props }) => (
    isLoggedIn || (isRegistered && !isConfirmed) ? <button {...props} onClick={actions.logout}>{children}</button> : null
);

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({ logout }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Logout);