import React from "react"
import Weather from "../Weather/Weather";
import axios from "axios";
import {DEFAULT} from "../../constants/initial-state";
import { connect } from 'react-redux';
import {getMainCity} from "../../reducers"
import {getWeatherError, getWeatherSuccess, getWeatherWait} from "../../actions";
import "./App.css"
import {WList} from "../WeatherList/WeatherList";
import {Add} from "../AddForm/AddForm";

const getWeather = (dispatch, coords, id) => {
    axios
        .get(`https://api.openweathermap.org/data/2.5/weather?lat=${coords.latitude}&lon=${coords.longitude}&units=metric&APPID=96c2fc4713551153e7966978b449861a`)
        .then(response => {
            dispatch(getWeatherSuccess(response.data, id));
        })
        .catch(error => {
            dispatch(getWeatherError(error, id));
        });
};


export const getWeatherByCoordsAction = () => {
    return dispatch => {
        const id = 0;
        const options = {
            enableHighAccuracy: true,
            timeout: 3000
        };

        dispatch(getWeatherWait(id));

        if (!navigator.geolocation) {
            getWeather(dispatch, DEFAULT, id);
            console.log("Geolocation is missing");
        } else {
            navigator.geolocation.getCurrentPosition((position) => {
                getWeather(dispatch, position.coords, id);
            }, err => {
                        getWeather(dispatch, DEFAULT, id);
                        console.log("Geolocation error: " + err);
                        }, options);
        }
    }
};


class App extends React.Component {
    render() {
        return (
                <div className="App">
                    <div className="header">
                        <div><h1>Weather</h1></div> <div><button className="geoBtn" onClick={() => this.props.getWeatherByCoords()}>Change Geolocation</button></div>
                    </div>
                    <Weather key={0} data={this.props.mainCity} getWeather={() => this.props.getWeatherByCoords()}/>
                    <Add/>
                    <WList/>
                </div>
        );
    }
}

const mapStateToProps = (state) => ({
    mainCity: getMainCity(state)
});

const mapDispatchToProps = (dispatch) => ({
    getWeatherByCoords: () => dispatch(getWeatherByCoordsAction())
});

const AppC = connect(mapStateToProps, mapDispatchToProps)(App);

export {AppC, App};