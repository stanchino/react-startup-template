import React from 'react';
import { connect } from 'react-redux';
import ConfirmationForm from './ConfirmationForm';

const ProtectedComponent = ({ isLoggedIn, isRegistered, isConfirmed, children = null, component = null }) => {
    return isLoggedIn ? children : (isRegistered && !isConfirmed) ? <ConfirmationForm /> : component;
};

const mapStateToProps = state => ({
    isLoggedIn: state.auth.isLoggedIn,
    isRegistered: state.auth.isRegistered,
    isConfirmed: state.auth.isConfirmed
});

export default connect(mapStateToProps)(ProtectedComponent);