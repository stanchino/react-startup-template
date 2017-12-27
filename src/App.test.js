import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';

import createMemoryHistory from 'history/createBrowserHistory';
import configureStore from "./stores";

import { Home, Public, PrivateComponent, NotFound } from './components/index';
import { SignInForm, SignUpForm, SignOutLink } from './auth/components';

import { signIn, logout } from './auth/actions';

import App from './App';

const history = createMemoryHistory();
const { store } = configureStore(history);

const testRoute = (description, path, component, count = 1) => {
    it(description, () => {
        history.push(path);
        const wrapper = mount(<Provider store={store}><App history={history}/></Provider>);
        expect(wrapper.find(component).length).toEqual(count);
    });
};

const behavesLikeRouteWithRedirect = (path, redirect_path = '/') => {
    it(`redirects from ${path} to ${redirect_path}`, () => {
        history.push(path);
        mount(<Provider store={store}><App history={history}/></Provider>);
        expect(history.location.pathname).toEqual(redirect_path);
    });
};

describe('routes', () => {
    describe('for unauthenticated users', () => {
        beforeEach(() => {
            store.dispatch(logout());
        });
        testRoute('shows the home page', '/', Home);
        testRoute('shows the public page', '/public', Public);
        testRoute('displays the NotFound component', '/testUrlForNotFound', NotFound);
        testRoute('shows the Login form for the /private path', '/private', SignInForm);
        testRoute('does not show the PrivateComponent for the /private path', '/private', PrivateComponent, 0);
        testRoute('shows the registration form', '/register', SignUpForm);
        testRoute('shows the login form', '/login', SignInForm);

        it('does not login the user with invalid credentials', () => {
            store.dispatch(signIn.request({ username: 'blah', password: 'blah'}));
            const wrapper = mount(<Provider store={store}><App history={history}/></Provider>);
            expect(wrapper.find(SignInForm).length).toEqual(1);
        });
    });

    describe('when the user logs in', () => {
        beforeEach(() => {
            store.dispatch(signIn.success({ username: 'johndoe', password: 'password' }));
        });

        it('logs the user in with valid credentials', () => {
            const wrapper = mount(<Provider store={store}><App history={history}/></Provider>);
            expect(wrapper.find(SignInForm).length).toEqual(0);
            expect(wrapper.find(SignOutLink).length).toEqual(1);
        });
    });

    describe('for authenticated users', () => {
        beforeEach(() => {
            store.dispatch(signIn.success({ username: 'johndoe', email: 'john@doe.com' }));
        });

        testRoute('shows the home page', '/', Home);
        testRoute('shows the logout link', '/', SignOutLink);
        testRoute('shows the public page', '/public', Public);
        testRoute('displays the NotFound component', '/testUrlForNotFound', NotFound);
        testRoute('does not show the Login form for the /private path', '/private', SignInForm, 0);
        testRoute('shows the PrivateComponent for the /private path', '/private', PrivateComponent);
        behavesLikeRouteWithRedirect('/login');
        behavesLikeRouteWithRedirect('/register');

        it('logs the user out', () => {
            history.push('/');
            const wrapper = mount(<Provider store={store}><App history={history}/></Provider>);
            expect(wrapper.find(SignOutLink).length).toEqual(1);
            store.dispatch(logout());
            expect(wrapper.render().find(SignOutLink).length).toEqual(0);
        });
    });
});