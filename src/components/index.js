import React from 'react';
import Protected from '../auth/components';

export const Home = () => (
    <div>Home</div>
);

export const Public = () => (
    <div>Public</div>
);

export const Private = () => (
    <Protected>
        <div>Private</div>
    </Protected>
);

export const NotFound = () => (
    <div>
        <h3>404 page not found</h3>
        <p>We are sorry but the page you are looking for does not exist.</p>
    </div>
);


