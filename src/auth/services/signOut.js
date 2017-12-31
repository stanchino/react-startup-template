import { cognitoUser } from "./utils";

export default function(username) {

    cognitoUser(username).signOut();

    return Promise.resolve();
}