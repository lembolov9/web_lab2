import * as actions from "../constants/action-types";
import {INITIAL_STATE} from "../constants/initial-state";
import {combineReducers} from "redux";

const weatherReducer = (state =INITIAL_STATE.cityList, action = {}) => {
    let newState = [];
    if (action.id === 0) {
        return state;
    }

    switch (action.type) {
        case actions.WEATHER_WAIT:
            newState = state.cities.map(city =>
                city.id === action.id ? {...city, waiting: true} : city
            );
            return {
                ...state,
                cities: newState
            };

        case actions.WEATHER_SUCCESS:
            newState = state.cities.map(city =>
                city.id === action.id ? {...city, waiting: false, weather: action.weather} : city
            );
            return {
                ...state,
                cities: newState
            };

        case actions.WEATHER_ERROR:
            newState = state.cities.map(city =>
                city.id === action.id ? {...city, waiting: false, error: action.error} : city
            );
            return {
                ...state,
                cities: newState
            };

        case actions.ADD_CITY:
            newState = [
                ...state.cities,
                {
                    id: state.newCityId,
                    name: action.name
                }
            ]
            return {
                ...state,
                newCityId: state.newCityId + 1,
                cities: newState
            };

        case actions.DELETE_CITY:
            newState = state.cities.filter(city => city.id !== action.id);
            return {
                ...state,
                cities: newState
            };

        default:
            return state;
    }
};

const mainCityReducer = (state = INITIAL_STATE.mainCity, action = {}) => {
    if (action.id !== 0) {
        return state;
    }
    switch (action.type) {
        case actions.WEATHER_WAIT:
            return {
                ...state,
                waiting: true
            };

        case actions.WEATHER_SUCCESS:
            return {
                ...state,
                waiting: false,
                weather: action.weather
            };

        case actions.WEATHER_ERROR:
            return {
                ...state,
                waiting: false,
                error: action.error
            };

        default:
            return state;
    }
};

export const getCities = state => state.cityList.cities;
export const getNewCityId = state => state.cityList.newCityId;
export const getMainCity = state => state.mainCity;

export default combineReducers({
    cityList: weatherReducer,
    mainCity: mainCityReducer
});