import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';
import registerServiceWorker from './registerServiceWorker';

import routes from './routes';
import App from "./App";

import './index.css';

const browserHistory = createBrowserHistory();

ReactDOM.render(
    <Router history={browserHistory}>
        <App>
            {routes}
        </App>
    </Router>,
    document.getElementById('root')
);
registerServiceWorker();
