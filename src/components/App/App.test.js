import renderer from "react-test-renderer";
import configureMockStore from "redux-mock-store";
import React from "react";
import {App} from "./App";
import {Provider} from "react-redux";
import {INITIAL_STATE} from "../../constants/initial-state";
import correctWeather from "../../test-data/correctWeather";

const mockStore = configureMockStore();
const fakeState = INITIAL_STATE;
fakeState.mainCity.weather = correctWeather;
fakeState.mainCity.waiting = false;

const fakeStore = mockStore(fakeState);

it("App display correctly", () => {
    const component = renderer.create(
        <Provider store={fakeStore}>
            <App getWeatherByCoords={() => {}} mainCity={fakeState.mainCity} />
        </Provider>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});