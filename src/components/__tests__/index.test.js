import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import renderer from "react-test-renderer";

import createMemoryHistory from "history/createBrowserHistory";
import configureStore from "../../stores/index";

import { Home, Public, PrivateComponent, Private, NotFound } from "../index";
import { SignInForm } from "../../auth/components/index";
import { signIn } from "../../auth/actions/index";

const testComponent = (description, component) => {
    it(description, () => {
        expect(renderer.create(component).toJSON()).toMatchSnapshot();
    });
};

describe("components", () => {
    testComponent("renders Home without errors", <Home/>);
    testComponent("renders Public without errors", <Public/>);
    testComponent("renders PrivateComponent without errors", <PrivateComponent/>);
    testComponent("renders NotFound without errors", <NotFound/>);
});

describe("Private", () => {
    const history = createMemoryHistory();
    const { _, store } = configureStore(history);
    let subject;

    describe("for unauthenticated users", () => {
        beforeEach(() => {
            subject = mount(<Provider store={store}><Private/></Provider>);
        });

        it("will render the login form", () => {
            expect(subject).toContainReact(<SignInForm/>);
        });

        it("will not show the private contents", () => {
            expect(subject).not.toContainReact(<PrivateComponent/>);
        });
    });

    describe("for authenticated users", () => {
        beforeEach(() => {
            store.dispatch(signIn.success({profile: "blah"}));
            subject = mount(<Provider store={store}><Private/></Provider>);
        });

        it("will not render the login form", () => {
            expect(subject).not.toContainReact(<SignInForm/>);
        });

        it("will show the private contents", () => {
            expect(subject).toContainReact(<PrivateComponent/>);
        });
    });
});