import React from 'react';
import { connect } from 'react-redux';
import { NotFound } from '.';

const ProtectedComponent = ({ isLoggedIn, children }) => {
    return isLoggedIn ? children : <NotFound />;
};

const mapStateToProps = state => ({
    isLoggedIn: state.auth.isLoggedIn
});

export default connect(mapStateToProps)(ProtectedComponent);