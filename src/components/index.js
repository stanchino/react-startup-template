import React from 'react';
import LoginForm from './Login';

export const Home = () => (
    <div>Home</div>
);

export const Public = () => (
    <div>Public</div>
);

export const Private = () => (
    <div>Private</div>
);

export const NotFound = () => (
    <div>
        <h3>404 page not found</h3>
        <p>We are sorry but the page you are looking for does not exist.</p>
    </div>
);

export { LoginForm as Login };


