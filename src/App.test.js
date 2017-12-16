import React from 'react';
import renderer from 'react-test-renderer';

import { Provider } from 'react-redux';

import createHistory from 'history/createBrowserHistory';
import configureStore from './stores';

import App from './App';

const history = createHistory();
const { _, store } = configureStore(history);

it('will render app', () => {
    const app = renderer
        .create(
            <Provider store={store}>
                <App history={history}/>
            </Provider>
        ).toJSON();
    expect(app).toMatchSnapshot();
});