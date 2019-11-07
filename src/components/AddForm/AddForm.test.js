import renderer from "react-test-renderer";
import React from "react";
import {AddForm} from "./AddForm";


it("AddForm render ok", () => {
    const component = renderer.create(<AddForm />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});