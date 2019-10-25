import React from "react";
import "./Weather.css"

class Weather extends React.Component {

    componentDidMount() {
        this.props.getWeather();
    }

    render() {
        if (this.props.data.error) {
            return (
                <div className='Weather error'>
                    <div>Shit happens</div>
                    {this.props.data.id !== 0 && <button onClick={this.props.deleteCity} className='circle'>x</button>}
                </div>
            );
        } else {
            console.warn(this.props.data.id)
            const weather = this.props.data.weather;
            if (this.props.data.waiting === false) {
                const weather_img = (
                    this.props.data.id ? `https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`:
                        `https://openweathermap.org/themes/openweathermap/assets/vendor/owm/img/widgets/${weather.weather[0].icon}.png`
                );
                return (
                    <div className={this.props.data.id ? 'Weather': 'Weather grid'}>
                        <div className={this.props.data.id ? 'mainInfo propsRow flex': 'mainInfo grid'}>
                            <div className="cityName">{this.props.data.id ? weather.name: <h3>{weather.name}</h3>}</div>
                            <div className="cityTemp">{weather.main.temp} ℃</div>
                            <div className="cityIcon"><img alt="weather icon" src={weather_img}/></div>
                            {this.props.data.id !==0 && (<div><button onClick={this.props.deleteCity} className='deleteBtn'>+</button></div>) }
                        </div>
                        <div className={this.props.data.id ? 'Info flex': 'Info flex'}>
                            <div>Wind speed:</div><div>{weather.wind.speed} m/s</div>
                            </div>
                            <div className='propsRow flex'>
                            <div>Clouds:</div><div>{weather.clouds.all}%</div>
                            </div>
                            <div className='propsRow flex'>
                            <div>Pressure:</div><div>{weather.main.pressure}hpa</div>
                            </div>
                            <div className='propsRow flex'>
                            <div>Humidity:</div><div>{weather.main.humidity}%</div>
                            </div>
                            <div className='propsRow flex'>
                            <div>Coordinates:</div><div>[{weather.coord.lon}, {weather.coord.lat}]</div>
                            </div>

                        </div>
                );
            } else {
                return (
                    <div className='Weather'>
                        <div className="loader"></div>
                    </div>
                );
            }
        }
    }
}
export default Weather;