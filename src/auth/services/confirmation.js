import { CognitoUser } from 'amazon-cognito-identity-js'

import userPool from './config';

export default ({ username, code }) => {
    const userData = {
        Username: username,
        Pool: userPool
    };

    const cognitoUser = new CognitoUser(userData);

    return new Promise((resolve, reject) => {
        cognitoUser.confirmRegistration(code, true, function(err, result) {
            if (err) {
                reject(err)
            } else {
                resolve(result)
            }
        })
    })
};