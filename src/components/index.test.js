import React from 'react';
import { mount } from "enzyme";
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';

import createMemoryHistory from 'history/createBrowserHistory';
import configureStore from '../stores';

import { Home, Public, PrivateComponent, Private, NotFound } from '.';
import { Login } from '../auth/components';
import { login } from '../auth/actions';

describe('Home', () => {
    it('renders without errors', () => {
        const wrapper = renderer.create(<Home/>).toJSON();
        expect(wrapper).toMatchSnapshot();
    });
});

describe('Public', () => {
    it('renders without errors', () => {
        const wrapper = renderer.create(<Public/>).toJSON();
        expect(wrapper).toMatchSnapshot();
    });
});

describe('PrivateComponent', () => {
    it('renders without errors', () => {
        const wrapper = renderer.create(<PrivateComponent/>).toJSON();
        expect(wrapper).toMatchSnapshot();
    });
});

describe('NotFound', () => {
    it('renders without errors', () => {
        const wrapper = renderer.create(<NotFound/>).toJSON();
        expect(wrapper).toMatchSnapshot();
    });
});

describe('Private', () => {
    const history = createMemoryHistory();
    const { _, store } = configureStore(history);

    describe('for unauthenticated users', () => {

        it('will render the login form', () => {
            const wrapper = mount(<Provider store={store}><Private/></Provider>);
            expect(wrapper).toContainReact(<Login/>);
        });

        it('will not show the private contents', () => {
            const wrapper = mount(<Provider store={store}><Private/></Provider>);
            expect(wrapper).not.toContainReact(<PrivateComponent/>);
        });
    });

    describe('for authenticated users', () => {
        beforeEach(() => {
            store.dispatch(login.success({profile: 'blah'}));
        });

        it('will not render the login form', () => {
            const wrapper = mount(<Provider store={store}><Private/></Provider>);
            expect(wrapper).not.toContainReact(<Login/>);
        });

        it('will show the private contents', () => {
            const wrapper = mount(<Provider store={store}><Private /></Provider>);
            expect(wrapper).toContainReact(<PrivateComponent/>);
        });
    });
});