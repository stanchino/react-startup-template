import React from 'react';

import './App.css';

export default function App({ children }) {
    return (
        <div className={'container'}>
            <nav key={'navigation'}>
                <a href={'/'}>Home</a>
                <a href={'/public'}>Public</a>
                <a href={'/private'}>Private</a>
            </nav>
            {children}
        </div>
    );
}