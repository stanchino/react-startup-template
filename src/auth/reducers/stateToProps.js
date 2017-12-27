export default state => ({
    isLoggedIn: state.auth.isLoggedIn,
    isRegistered: state.auth.isRegistered,
    isConfirmed: state.auth.isConfirmed
});