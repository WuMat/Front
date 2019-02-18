import React, { useEffect, useState } from "react";
import debounce from "lodash/debounce";
import { NavLink } from "react-router-dom";
import axios from "../../../axios";

import Film from "../../Film/Film";
import { SearchPanel } from "../../SearchPanel/SearchPanel";

import "./FilmsPages.css";
import Context from "../../../auth-context";

export const FilmsPages = props => {
  const [showSearchPanel, setShowSearchPanel] = useState(false);
  const [loadedFilms, setLoadedFilms] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    download(setLoadedFilms);
  }, []);

  const sideDrawerHandler = () => {
    setShowSearchPanel(!showSearchPanel);
  };

  const deleteHandler = id => {
    const token = localStorage.getItem("token");

    axios
      .delete(`/films/${id}`, { headers: { Authorization: token } })
      .then(response => {
        console.log(response);
        window.location.reload();
      })
      .catch(err => {
        console.log(err);
      });
  };

  const inputChangeHandler = e => {
    setSearchValue(e.target.value);

    const token = localStorage.getItem("token");
    const data = { name: e.target.value };

    searchDebounce(data, token, setLoadedFilms);
  };

  let films = null;
  films = loadedFilms.map(film => {
    return (
      <Film
        key={film._id}
        titlePl={film.titlePl}
        title={film.title}
        size={film.size}
        diskName={film.diskName}
        delete={() => deleteHandler(film._id)}
      />
    );
  });

  return (
    <div className="wrapPages">
      <div className="filmsPages">
        <SearchPanel
          show={showSearchPanel}
          value={searchValue}
          onChange={e => inputChangeHandler(e)}
        />
        <div className="baseFIlm">BAZA FILMOW</div>
        <div className="title">
          <button onClick={sideDrawerHandler} className="clicky">
            Szukaj
          </button>
          <Context.Consumer>
            {appReducer => (
              <button
                onClick={() => appReducer({ type: "logoutHandler" })}
                className="clicky"
              >
                Wyloguj
              </button>
            )}
          </Context.Consumer>
          <NavLink to="/addFilm">
            <button className="clicky">Dodaj</button>
          </NavLink>
        </div>
        {films}
      </div>
    </div>
  );
};
export default FilmsPages;

const download = async cb => {
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");
  const URL = "/films";

  const data = await axios.get(URL, {
    headers: { Authorization: token, userId: user }
  });
  cb(data.data.films);
};

const searchDebounce = debounce(async (data, token, saveToState) => {
  const downoladedData = await axios.post(`/films/search`, data, {
    headers: { Authorization: token }
  });

  saveToState(downoladedData.data.films);
}, 500);
