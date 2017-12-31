import React from "react";
import { Provider } from "react-redux";
import { mount } from "enzyme";

import createMemoryHistory from "history/createBrowserHistory";
import configureStore from "../stores/index";

import { Home, Public, PrivateComponent, NotFound } from "../components/index";
import { SignInForm, SignUpForm, SignOutLink } from "../auth/components/index";

import { signInRoutine, signOutRoutine } from "../auth/actions/index";

import App from "../App";

const history = createMemoryHistory();
const { store } = configureStore(history);

const subject = () => (
    mount(<Provider store={store}><App history={history}/></Provider>)
);

const testRoute = (description, path, component, count = 1) => {
    it(description, () => {
        history.push(path);
        expect(subject().find(component).length).toEqual(count);
    });
};

const behavesLikeRouteWithRedirect = (path, redirect_path = "/") => {
    it(`redirects from ${path} to ${redirect_path}`, () => {
        history.push(path);
        subject();
        expect(history.location.pathname).toEqual(redirect_path);
    });
};

describe("routes", () => {
    describe("for unauthenticated users", () => {
        beforeEach(() => {
            store.dispatch(signOutRoutine.fulfill());
        });
        testRoute("shows the home page", "/", Home);
        testRoute("shows the public page", "/public", Public);
        testRoute("displays the NotFound component", "/testUrlForNotFound", NotFound);
        testRoute("shows the Login form for the /private path", "/private", SignInForm);
        testRoute("does not show the PrivateComponent for the /private path", "/private", PrivateComponent, 0);
        testRoute("shows the registration form", "/register", SignUpForm);
        testRoute("shows the login form", "/login", SignInForm);

        describe("when the user logs in", () => {
            beforeEach(() => {
                store.dispatch(signInRoutine.success({ username: "johndoe" }));
            });

            it("logs the user in with valid credentials", () => {
                expect(subject().find(SignInForm).length).toEqual(0);
                expect(subject().find(SignOutLink).length).toEqual(1);
            });
        });

        it("does not show the logout link", () => {
            history.push("/");
            expect(subject().text()).not.toMatch('Logout');
        });
    });

    describe("for authenticated users", () => {
        beforeEach(() => {
            store.dispatch(signInRoutine.success({ username: "johndoe" }));
        });

        testRoute("shows the home page", "/", Home);
        testRoute("shows the logout link", "/", SignOutLink);
        testRoute("shows the public page", "/public", Public);
        testRoute("displays the NotFound component", "/testUrlForNotFound", NotFound);
        testRoute("does not show the Login form for the /private path", "/private", SignInForm, 0);
        testRoute("shows the PrivateComponent for the /private path", "/private", PrivateComponent);
        behavesLikeRouteWithRedirect("/login");
        behavesLikeRouteWithRedirect("/register");

        it("logs the user out", () => {
            history.push("/");
            expect(subject().find(SignOutLink).length).toEqual(1);
            store.dispatch(signOutRoutine.fulfill());
            expect(subject().render().find(SignOutLink).length).toEqual(0);
        });
    });
});