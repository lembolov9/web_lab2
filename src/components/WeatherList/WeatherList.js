import React from "react";
import Weather from "../Weather/Weather";
import { getWeatherWait, getWeatherError, getWeatherSuccess, deleteCity } from '../../actions';
import { connect } from 'react-redux';
import axios from "axios"
import {getCities, getNewCityId} from "../../reducers"
import "./WeatherList.css"

export const getWeatherByNameAction = (id, cityName) => {
    return dispatch => {
        dispatch(getWeatherWait(id));
        axios
            .get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&APPID=96c2fc4713551153e7966978b449861a`)
            .then(response => {
                dispatch(getWeatherSuccess(response.data, id));
                console.log(response.data);
            })
            .catch(error => {
                dispatch(getWeatherError(error, id));
                console.log(error);
            });
    }
};

const mapStateToProps = (state) => ({
    cities: getCities(state),
    newCityId: getNewCityId(state)
});

const mapDispatchToProps = (dispatch) => ({
    getWeatherByName: (id, name) => dispatch(getWeatherByNameAction(id, name)),
    deleteCity: id => dispatch(deleteCity(id))
});


class WeatherList extends React.Component {

    render() {
        return (
            <div className="WeatherList">
                {this.props.cities.map(city => (
                    <Weather key={city.id} data={city} getWeather={() => this.props.getWeatherByName(city.id, city.name)} deleteCity={() => this.props.deleteCity(city.id)}/>
                ))}
            </div>
        );
    }
}

const WList = connect(mapStateToProps, mapDispatchToProps)(WeatherList);


export {WList , WeatherList};