import React from "react";
import { Provider } from "react-redux";
import createMemoryHistory from "history/createBrowserHistory";
import { SubmissionError } from "redux-form";
import { mount } from "enzyme";

import configureStore from "../../../stores/index";
import { matchSnapshot } from "../tests/shared-examples";

import ConfirmationForm from "../ConfirmationForm";

const history = createMemoryHistory();
const { store } = configureStore(history);

describe("ConfirmationForm", () => {
    matchSnapshot(<Provider store={store}><ConfirmationForm /></Provider>);

    it("submits the form", () => {
        const spy = jest.fn();
        const subject = mount(<Provider store={store}><ConfirmationForm onSubmit={spy}/></Provider>);
        subject.find("input[name='code']").simulate("change", { target: { value: "1234" } });
        subject.find("form").simulate("submit");
        expect(spy.mock.calls.length).toEqual(1)
    });

    it("renders errors", () => {
        const subject = mount(<Provider store={store}><ConfirmationForm onSubmit={() => { throw new SubmissionError({ _error: "error message" }) } }/></Provider>);
        subject.find("form").simulate("submit");
        expect(subject.text()).toMatch("error message");
    });
});