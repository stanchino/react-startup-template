import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import createMemoryHistory from "history/createBrowserHistory";

import configureStore from "../../../stores/index";

import { Protected, SignInForm }  from "../index";
import ConfirmationForm from "../ConfirmationForm";
import { signInRoutine, signUpRoutine, confirmationRoutine, signOutRoutine } from "../../actions/index";

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

describe("Protected Component", () => {
    it("when the user is not registered", () => {
        store.dispatch(signOutRoutine.fulfill());
        expect(subject()).toContainReact(<SignInForm />);
    });

    rendersComponentOn("when the user is not registered", signUpRoutine, 'failure', <SignInForm />);
    rendersComponentOn("when the user is registered", signUpRoutine, 'success', <ConfirmationForm/>);
    rendersComponentOn("when the user confirmation fails", confirmationRoutine, 'failure', <ConfirmationForm/>);
    rendersComponentOn("when the user is logged in", signInRoutine, 'success', <ChildComponent/>);
});