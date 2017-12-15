import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import createHistory from 'history/createBrowserHistory';
import { PersistGate } from 'redux-persist/es/integration/react';
import configureStore from './stores';
import registerServiceWorker from './registerServiceWorker';

import App from "./App";

import './index.css';

const history = createHistory();
const { persistor, store } = configureStore(history);

ReactDOM.render(
    <Provider store={store}>
        <PersistGate persistor={persistor}>
            <App history={history} />
        </PersistGate>
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker();
