import React from "react";
import Input from "../../Input/Input";
import axios from "../../../axios";
import Spinner from "../../spinner/Spinner";
import Film from "./film.png";

import "./AddFilm.css";

class AddFilm extends React.Component {
  state = {
    filmInput: {
      titlePl: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Tytul Pl"
        },
        value: ""
      },
      title: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Tytul orginalny"
        },
        value: ""
      },
      size: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "rozmiar pliku"
        },
        value: ""
      },
      diskName: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "na czym jest film"
        },
        value: ""
      }
    },
    loading: false
  };

  inputChangedHandler = (event, id) => {
    const value = event.target.value;

    const newFilm = {
      ...this.state.filmInput
    };

    const updateElement = {
      ...newFilm[id]
    };
    updateElement.value = value;
    newFilm[id] = updateElement;

    this.setState({
      filmInput: newFilm
    });
  };

  sendFilmHandler = event => {
    event.preventDefault();
    this.setState({ loading: true });
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    const formData = {};
    for (let nameData in this.state.filmInput) {
      formData[nameData] = this.state.filmInput[nameData].value;
    }

    axios
      .post("/films/", formData, {
        headers: { Authorization: token, userId: user }
      })
      .then(response => {
        this.setState({ loading: false });
        this.props.history.push({ pathname: "/films" });
      })
      .catch(error => {
        console.log(error);
      });
  };

  clickHandler = () => {
    this.setState({ loading: false });
    this.props.history.push({ pathname: "/films" });
  };

  render() {
    const formArray = [];
    for (let key in this.state.filmInput) {
      formArray.push({
        id: key,
        config: this.state.filmInput[key]
      });
    }

    let form = (
      <form className="addForm" onSubmit={this.sendFilmHandler}>
        {formArray.map(oneInput => (
          <Input
            className="input-addFilm"
            key={oneInput.id}
            elementConfig={oneInput.config.elementConfig}
            value={oneInput.config.value}
            changed={event => this.inputChangedHandler(event, oneInput.id)}
          />
        ))}
        {this.state.loading ? (
          <Spinner />
        ) : (
          <button className="poszlo"> wyslij</button>
        )}
        <button className="zamknij" onClick={this.clickHandler}>
          zamknij
        </button>
      </form>
    );

    return (
      <div className="addFilm">
        <div className="addFilm__form">
          <img src={Film} alt="film" />
          {form}
        </div>
      </div>
    );
  }
}

export default AddFilm;
