import React from "react";
import {connect} from "react-redux";
import {getCities, getNewCityId} from "../../reducers";
import {addCity} from "../../actions";
import "./AddForm.css"


class AddForm extends React.Component {
    constructor(props) {
        super(props);

        this.handleFormInput = this.handleFormInput.bind(this);
    }

    handleFormInput(event) {
        event.preventDefault();
        this.props.addCity(event.target[0].value);
    }

    render() {
        return (
            <div className="AddForm">
                <div><h2>Favourites</h2></div>
                <div>
                    <form onSubmit={this.handleFormInput}>
                        <input id="addCity" placeholder="Add city" required/>
                        <button className="addBtn" type="submit">+</button>
                    </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    nextCityId: getNewCityId(state),
    cities: getCities(state)
});

const mapDispatchToProps = dispatch => ({
    addCity: name => dispatch(addCity(name))
});

const Add = connect(mapStateToProps, mapDispatchToProps)(AddForm);


export {Add, AddForm};