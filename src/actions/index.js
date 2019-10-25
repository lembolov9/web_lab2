import * as constants from "../constants/action-types";

export const addCity = (name) => ({
    type: constants.ADD_CITY,
    name
});

export const deleteCity = (id) => ({
    type: constants.DELETE_CITY,
    id
});

export const getWeatherWait = (id) => ({
    type: constants.WEATHER_WAIT,
    id
});

export const getWeatherSuccess = (weather, id) => ({
    type: constants.WEATHER_SUCCESS,
    id,
    weather
});

export const getWeatherError = (error, id) => ({
    type: constants.WEATHER_ERROR,
    id,
    error
});