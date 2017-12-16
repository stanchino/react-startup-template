import React from 'react';
import { connect } from 'react-redux';
import Login from './Login';
import Logout from './Logout';

const mapStateToProps = state => ({
    isLoggedIn: state.auth.isLoggedIn
});

const ProtectedComponent = ({ isLoggedIn, children = null, component = <Login/> }) => {
    return isLoggedIn ? children : component;
};

export { Logout }
export default connect(mapStateToProps)(ProtectedComponent);