import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import createMemoryHistory from "history/createBrowserHistory";

import configureStore from "../../stores";

import { Protected, SignInForm }  from ".";
import ConfirmationForm from "./ConfirmationForm";
import { signIn, signUp, confirmation, logout } from "../actions";

const history = createMemoryHistory();
const { store } = configureStore(history);

const subject = () => (
    mount(<Provider store={store}><Protected component={<SignInForm />}><ChildComponent/></Protected></Provider>)
);

const ChildComponent = () => (<div/>);

const rendersComponentOn = (description, action, method, component) => {
    it(description, () => {
        store.dispatch(action[method].call());
        expect(subject()).toContainReact(component);
    });
};

describe("ConfirmationForm", () => {

    it("when the user is not registered", () => {
        store.dispatch(logout({}));
        expect(subject()).toContainReact(<SignInForm />);
    });

    rendersComponentOn("when the user is registered", signUp, 'success', <ConfirmationForm/>);
    rendersComponentOn("when the user is not registered", signUp, 'failure', <SignInForm />);
    rendersComponentOn("when the user is logged in", signIn, 'success', <ChildComponent/>);
    rendersComponentOn("when the user is confirmed", confirmation, 'success', <ChildComponent/>);
    rendersComponentOn("when the user confirmation fails", confirmation, 'failure', <ConfirmationForm/>);
});