import React from "react";
import { reduxForm } from "redux-form";
import { Provider } from "react-redux";
import createMemoryHistory from "history/createBrowserHistory";

import configureStore from "../../../stores/index";

import wrapWithForm from "../Form";
import { matchSnapshot } from "../tests/shared-examples";

const history = createMemoryHistory();
const { store } = configureStore(history);

const FormComponent = wrapWithForm(<div/>);
const Form = reduxForm({ form: 'test', onSubmit: jest.fn() })(FormComponent);

describe("Form", () => {
    matchSnapshot(<Provider store={store}><Form/></Provider>);
});