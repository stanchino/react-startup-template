import React from 'react';
import { Provider } from 'react-redux';
import { mount, shallow } from 'enzyme';

import createMemoryHistory from 'history/createBrowserHistory';
import configureStore from "./stores";

import { Home, Public, PrivateComponent, NotFound } from './components/index';
import { Login, Logout } from './auth/components';

import { login, logout } from './auth/actions';

import App from './App';

const history = createMemoryHistory();
const { _, store } = configureStore(history);

const testRoute = (description, path, component, count = 1) => {
    it(description, () => {
        history.push(path);
        const wrapper = mount(<Provider store={store}><App history={history}/></Provider>);
        expect(wrapper.find(component).length).toEqual(count);
    });
};

describe('routes', () => {
    describe('for unauthenticated users', () => {
        testRoute('shows the home paget', '/', Home);
        testRoute('does not show the logout link', '/', Logout, 0);
        testRoute('shows the public page', '/public', Public);
        testRoute('displays the NotFound component', '/testUrlForNotFound', NotFound);
        testRoute('shows the Login form for the /private path', '/private', Login);
        testRoute('does not show the PrivateComponent for the /private path', '/private', PrivateComponent, 0);
        testRoute('shows the login form', '/login', Login);

        it('does not login the user with invalid credentials', () => {
            store.dispatch({ type: login.REQUEST, payload: {} });
            const wrapper = mount(<Provider store={store}><App history={history}/></Provider>);
            expect(wrapper.find(Login).length).toEqual(1);
        });

        describe('when the user logs in', () => {
           beforeEach(() => {
               store.dispatch({ type: login.REQUEST, payload: { username: 'johndoe', password: 'password' } });
           });

            it('logs the user in with valid credentials', () => {
                const wrapper = mount(<Provider store={store}><App history={history}/></Provider>);
                expect(wrapper.find(Login).length).toEqual(0);
                expect(wrapper.find(Logout).length).toEqual(1);
            });
        });
    });

    describe('for authenticated users', () => {
        beforeEach(() => {
            store.dispatch(login.success({ profile: 'profile' }));
        });

        testRoute('shows the home page', '/', Home);
        testRoute('shows the logout link', '/', Logout);
        testRoute('shows the public page', '/public', Public);
        testRoute('displays the NotFound component', '/testUrlForNotFound', NotFound);
        testRoute('does not show the Login form for the /private path', '/private', Login, 0);
        testRoute('shows the PrivateComponent for the /private path', '/private', PrivateComponent);

        it('redirects to the home page from /login', () => {
            history.push('/login');
            mount(<Provider store={store}><App history={history}/></Provider>);
            expect(history.location.pathname).toEqual('/');
        });

        it('logs the user out', () => {
            history.push('/');
            const wrapper = mount(<Provider store={store}><App history={history}/></Provider>);
            expect(wrapper.find(Logout).length).toEqual(1);
            store.dispatch(logout());
            expect(wrapper.render().find(Logout).length).toEqual(0);
        });
    });
});