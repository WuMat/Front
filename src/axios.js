import axios from 'axios';

const instance = axios.create({
  // baseURL: 'https://whispering-shore-72195.herokuapp.com'
  baseURL: 'http://localhost:8080'
})

export default instance