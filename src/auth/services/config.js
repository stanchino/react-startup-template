import { CognitoUserPool, CookieStorage } from "amazon-cognito-identity-js"

export default new CognitoUserPool({
    UserPoolId: process.env.REACT_APP_COGNITO_USER_POOL_ID,
    ClientId: process.env.REACT_APP_COGNITO_CLIENT_ID,
    Storage: new CookieStorage({domain: process.env.REACT_APP_COOKIE_DOMAIN})
});