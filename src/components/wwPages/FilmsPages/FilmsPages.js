import React from 'react';
import {NavLink} from 'react-router-dom'
import axios from '../../../axios'
import Film from '../../Film/Film'
import SearchPanel from '../../SearchPanel/SearchPanel'

import './FilmsPages.css'
import AuthContext from '../../../auth-context';

class FilmsPages extends React.Component{
  static contextType = AuthContext;
  state={
    loadedFilms: [],
    showSearchPanel: true
    }

  componentDidMount(){
    const token = localStorage.getItem('token')
    const user = localStorage.getItem('user')
    const URL = '/films'
    
   axios.get(URL, { headers: { Authorization: token, userId: user } })
    .then(response => {
      this.setState({
        loadedFilms: response.data.films
      })
    })
  }
  sideDrawerHandler = () => {
    console.log('szukaj');
  }

  deleteHandler = (id) => {
    const token = localStorage.getItem('token')

    axios.delete(`/films/${id}`, { headers: { Authorization: token } })
    .then(response=>{
      console.log(response)
      window.location.reload(); 
      
    })
    .catch(err=>{
      console.log(err);
      })
  }

  render(){
   
    let films = null;
    films = this.state.loadedFilms.map(film => {
      return(
        <Film
        key={film._id}
        titlePl={film.titlePl}
        title={film.title}
        size={film.size}
        diskName={film.diskName}
        delete={() => this.deleteHandler(film._id)}
        />
      )
    });
    let searchPanel = (
      this.state.showSearchPanel ? <SearchPanel /> : null 
    )
    return(
      <div className='wrapPages'>
      {searchPanel}
        <div className='filmsPages'>
          <div className="title">
            <button onClick={this.sideDrawerHandler} className='clicky'>Szukaj</button>
            <button onClick={this.context.logoutHandler} className='clicky'>Wyloguj</button>
            <NavLink to='/addFilm'><button className='clicky'>Dodaj</button></NavLink>
          </div>
         {films}
        </div>
      </div>
    )
  }
}
export default FilmsPages