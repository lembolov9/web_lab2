import correctWeather from "../../test-data/correctWeather";

import renderer from "react-test-renderer";
import React from "react";
import {WeatherList} from "./WeatherList";

it("WeatherList display different weathers", () => {
    const differentCities = [
        { id: 1, pending: false, weather: correctWeather },
        { id: 2, pending: false, error: {} },
        {id: 3, pending: true}
    ];
    const component = renderer.create(
        <WeatherList
            cities={differentCities}
            getWeatherByName={() => {}}
            deleteCity={() => {}}
        />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});