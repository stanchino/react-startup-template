import { CognitoUser, CookieStorage } from "amazon-cognito-identity-js"

import userPool from "./config";

export default ({ email, code }) => {
    const userData = {
        Username: email,
        Pool: userPool,
        Storage: new CookieStorage({domain: process.env.REACT_APP_COOKIE_DOMAIN})
    };

    const cognitoUser = new CognitoUser(userData);

    return new Promise((resolve, reject) => {
        cognitoUser.confirmRegistration(code, false, (err, result) => {
            if (err) {
                reject(err)
            } else {
                resolve(result)
            }
        })
    })
};