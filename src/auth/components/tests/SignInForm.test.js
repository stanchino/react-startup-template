import React from "react";
import { Provider } from "react-redux";
import createMemoryHistory from "history/createBrowserHistory";
import { mount } from "enzyme";

import { matchSnapshot, renderFormErrors } from "./shared-examples";

import configureStore from "../../../stores/index";
import { SignInForm } from "../index";

const history = createMemoryHistory();
const { store } = configureStore(history);

describe("SignInForm", () => {
    matchSnapshot(<Provider store={store}><SignInForm/></Provider>);
    renderFormErrors(SignInForm, store, { username: "Invalid User", _error: "SignIn Form Error"});

    it("submits the form", () => {
        const spy = jest.fn();
        const subject = mount(<Provider store={store}><SignInForm onSubmit={spy}/></Provider>);
        subject.find("input[name='username']").simulate("change", { target: { value: "johndoe" } });
        subject.find("input[name='password']").simulate("change", { target: { value: "test1234" } });
        subject.find("form").simulate("submit");
        expect(spy.mock.calls.length).toEqual(1)
    });
});