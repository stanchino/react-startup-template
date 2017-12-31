export default state => ({
    isLoggedIn: state.auth.signIn.isLoggedIn,
    isRegistered: state.auth.signUp.isRegistered,
    isConfirmed: state.auth.signUp.isConfirmed
});