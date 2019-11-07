import 'bootstrap/dist/css/bootstrap.css'
import React from 'react';
import {render} from 'react-dom';
import {Provider} from "react-redux";
import {applyMiddleware, createStore} from "redux";
import {INITIAL_STATE} from "./constants/initial-state";
import thunk from "redux-thunk";
import rootReducer from "./reducers/index"
import * as serviceWorker from './serviceWorker';
import {AppC} from "./components/App/App";

const newCityId = localStorage['weather-app'] ? JSON.parse(localStorage['weather-app'])['newCityId']: 1;
const cities = localStorage['weather-app'] ? JSON.parse(localStorage['weather-app'])['cityList']: [];

const state = {
    ...INITIAL_STATE,
    cityList: {
        ...INITIAL_STATE.cityList,
        cities ,
        newCityId
    }
};

const store  = createStore(rootReducer, state, applyMiddleware(thunk));

render(
        <Provider store={store}>
            <AppC/>
        </Provider>,
    document.getElementById("root")
);

store.subscribe(() => {
    localStorage.setItem('weather-app',JSON.stringify({
            'cityList': store.getState().cityList.cities.map(city => ({id: city.id, name: city.name})),
            'newCityId': store.getState().cityList.newCityId
            }
        )
    );
});

serviceWorker.unregister();