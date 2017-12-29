import React from "react";
import { Provider } from "react-redux";
import createMemoryHistory from "history/createBrowserHistory";
import { mount } from "enzyme";

import { matchSnapshot, renderFormErrors } from "./test/shared-examples";

import configureStore from "../../stores";
import { SignUpForm } from ".";

const history = createMemoryHistory();
const { store } = configureStore(history);

describe("SignUpForm", () => {
    matchSnapshot(<Provider store={store}><SignUpForm/></Provider>);
    renderFormErrors(SignUpForm, store, { email: "Invalid Email", _error: "SignUp Form Error" });

    it("submits the form", () => {
        const spy = jest.fn();
        const subject = mount(<Provider store={store}><SignUpForm onSubmit={spy}/></Provider>);
        subject.find("input[name='email']").simulate("change", { target: { value: "john@doe.com" } });
        subject.find("input[name='username']").simulate("change", { target: { value: "johndoe" } });
        subject.find("input[name='password']").simulate("change", { target: { value: "test1234" } });
        subject.find("form").simulate("submit");
        expect(spy.mock.calls.length).toEqual(1)
    });
});