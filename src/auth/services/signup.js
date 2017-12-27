import { CognitoUserAttribute } from 'amazon-cognito-identity-js'

import userPool from './config';

export default ({ email, username, password }) => {
    const attributeList = [
        new CognitoUserAttribute({
            Name: 'email',
            Value: email
        })
    ];
    return new Promise((resolve, reject) => {
        userPool.signUp(username, password, attributeList, null, (err, result) => {
            if (err) {
                reject(err)
            } else {
                resolve(result)
            }
        })
    })
};