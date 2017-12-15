import users from './users.json';

const loginRequest = ({ username, password }) => {
    return new Promise((resolve, reject) => {
        const user = users.find(user => (user.username === username && user.password === password));
        if (user)
            resolve(user.profile);
        else
            reject();
    });
};

export { loginRequest };