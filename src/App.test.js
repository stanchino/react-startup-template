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


describe('routes', () => {
    describe('for unauthenticated users', () => {
        it('displays the Home component', () => {
            history.push('/');
            const wrapper = mount(<Provider store={store}><App history={history}/></Provider>);
            expect(wrapper.find(Home).length).toEqual(1);
        });

        it('does not show the logout link', () => {
            const wrapper = mount(<Provider store={store}><App history={history}/></Provider>);
            expect(wrapper.find(Logout).length).toEqual(0);
        });

        it('displays the Public component', () => {
            history.push('/public');
            const wrapper = mount(<Provider store={store}><App history={history}/></Provider>);
            expect(wrapper.find(Public).length).toEqual(1);
        });

        it('displays the NotFound component', () => {
            history.push('/testUrlForNotFound');
            const wrapper = mount(<Provider store={store}><App history={history}/></Provider>);
            expect(wrapper.find(NotFound).length).toEqual(1);
        });

        it('shows the login form for the Private component', () => {
            history.push('/private');
            const wrapper = mount(<Provider store={store}><App history={history}/></Provider>);
            expect(wrapper.find(Login).length).toEqual(1);
            expect(wrapper.find(PrivateComponent).length).toEqual(0);
        });

        it('shows the login form', () => {
            history.push('/login');
            const wrapper = mount(<Provider store={store}><App history={history}/></Provider>);
            expect(wrapper.find(Login).length).toEqual(1);
        });

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

        it('displays the Home component', () => {
            history.push('/');
            const wrapper = mount(<Provider store={store}><App history={history}/></Provider>);
            expect(wrapper.find(Home).length).toEqual(1);
        });

        it('displays the Public component', () => {
            history.push('/public');
            const wrapper = mount(<Provider store={store}><App history={history}/></Provider>);
            expect(wrapper.find(Public).length).toEqual(1);
        });

        it('displays the NotFound component', () => {
            history.push('/testUrlForNotFound');
            const wrapper = mount(<Provider store={store}><App history={history}/></Provider>);
            expect(wrapper.find(NotFound).length).toEqual(1);
        });

        it('shows the private component', () => {
            history.push('/private');
            const wrapper = mount(<Provider store={store}><App history={history}/></Provider>);
            expect(wrapper.find(Login).length).toEqual(0);
            expect(wrapper.find(PrivateComponent).length).toEqual(1);
        });

        it('shows the login form', () => {
            history.push('/login');
            mount(<Provider store={store}><App history={history}/></Provider>);
            expect(history.location.pathname).toEqual('/');
        });

        it('shows the logout link', () => {
            history.push('/');
            const wrapper = mount(<Provider store={store}><App history={history}/></Provider>);
            expect(wrapper.find(Logout).length).toEqual(1);
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