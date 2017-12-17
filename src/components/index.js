import React from 'react';
import Protected from '../auth/components';

export const Home = () => (
    <div>Home</div>
);

export const Public = () => (
    <div>Public</div>
);

export const PrivateComponent = () => (
    <div>Private</div>
);

export const Private = () => (
    <Protected>
        <PrivateComponent/>
    </Protected>
);

export const NotFound = () => (
    <div>
        <h3>404 page not found</h3>
        <p>We are sorry but the page you are looking for does not exist.</p>
    </div>
);


