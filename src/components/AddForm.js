import React, { Component } from "react";
import { Form } from "react-bootstrap";
class AddForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newPOI: {
        name: "",
        description: "",
        group: 0,
        image: "",
        lat: this.props.currentPointer.lat,
        lng: this.props.currentPointer.lng
      }
    };
  }

  inputFieldValueChanged = event => {
    this.setState({
      newPOI: {
        ...this.state.newPOI,
        [event.target.id]: event.target.value
      }
    });
  };

  addPOIButtonClicked = event => {
    event.preventDefault();
    this.props.handleForm(this.state.newPOI);
    this.setState(
      {
        newCategoryObject: { id: null, name: null, budget: null }
      },
      () => this.refs.form.reset()
    );
  };

  render() {
    return (
      <React.Fragment>
        <form ref="form">
          Name:{" "}
          <input id="name" type="text" onChange={this.inputFieldValueChanged} />
          <br />
          Description:{" "}
          <input
            id="description"
            type="text"
            onChange={this.inputFieldValueChanged}
          />
          <br />
          Group:{" "}
          <input
            id="group"
            type="number"
            onChange={this.inputFieldValueChanged}
          />
          Image:{" "}
          <input
            id="image"
            type="text"
            onChange={this.inputFieldValueChanged}
          />
          <br />
          <input
            className="btn btn-success "
            type="submit"
            onClick={this.addPOIButtonClicked}
            value="Add POI"
          />
        </form>
      </React.Fragment>
    );
  }
}

export default AddForm;
