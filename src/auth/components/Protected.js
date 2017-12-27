import React from 'react';
import { connect } from 'react-redux';
import ConfirmationForm from './ConfirmationForm';
import mapStateToProps from '../reducers/stateToProps';

const ProtectedComponent = ({ isLoggedIn, isRegistered, isConfirmed, children = null, component = null }) => {
    return isLoggedIn ? children : (isRegistered && !isConfirmed) ? <ConfirmationForm /> : component;
};

export default connect(mapStateToProps)(ProtectedComponent);