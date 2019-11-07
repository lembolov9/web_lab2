import React from "react";
import Weather from "./Weather";
import renderer from "react-test-renderer";
import correctWeather from "../../test-data/correctWeather";


describe("Main city weather", () => {
    it("Ready weather data", () => {
        const testData = {
            id: 0,
            waiting: false,
            weather: correctWeather
        }
        const component = renderer.create(<Weather data={testData} getWeather={()=> {}}/>);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
    it("Not ready weather data", () => {
        const testData = {
            id: 0,
            waiting: true
        }
        const component = renderer.create(<Weather data={testData} getWeather={()=> {}}/>);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
    it("Error", () => {
        const testData = {
            id: 0,
            waiting: false,
            error: "Upps"
        }
        const component = renderer.create(<Weather data={testData} getWeather={()=> {}}/>);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

})

describe("Not main city weather", () => {
    it("Ready weather data", () => {
        const testData = {
            id: 100,
            waiting: false,
            weather: correctWeather
        }
        const component = renderer.create(<Weather data={testData} getWeather={()=> {}}/>);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
    it("Not ready weather data", () => {
        const testData = {
            id: 100,
            waiting: true
        }
        const component = renderer.create(<Weather data={testData} getWeather={()=> {}}/>);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
    it("Error", () => {
        const testData = {
            id: 100,
            waiting: false,
            error: "Upps"
        }
        const component = renderer.create(<Weather data={testData} getWeather={()=> {}}/>);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

})

