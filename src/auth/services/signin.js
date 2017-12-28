import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js"

import userPool from "./config";

export default function({ username, password }) {
    const authenticationData = {
        Username: username,
        Password: password
    };
    const authenticationDetails = new AuthenticationDetails(authenticationData);

    const userData = {
        Username: username,
        Pool: userPool
    };

    const cognitoUser = new CognitoUser(userData);

    return new Promise((resolve, reject) => {
        cognitoUser.authenticateUser(authenticationDetails, {
            onSuccess: function(result) {
                const { email } = result.idToken;
                resolve({ email: email });
            },
            onFailure: function(err) {
                reject(err);
            }
        })
    })
}