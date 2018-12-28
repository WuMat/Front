import React from 'react';
import './LoginPages.css';
import axios from '../../../axios'
import spider from './spider.png'

import AuthContext from '../../../auth-context';
import Input from '../../Input/Input';
import Spinner from '../../spinner/Spinner'

class Login extends React.Component {
  static contextType = AuthContext;
  state={
    formInput:{
      login:{
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Login'
        },
        Value:''
      },
      password:{
        elementType: 'input',
        elementConfig:{
          type: 'text',
          placeholder: 'Password'
        },
        Value:'',
      }
    },
    loading: false,
    loadingRegister: false,
    messageRes: ''
  }

  inputChangeHandler = (event, id) => {
    let value = event.target.value;
    const updateState = {
      ...this.state.formInput
    }
    const updateElement = {
      ...updateState[id]
    }
    updateElement.value = value;
    updateState[id] = updateElement

    this.setState({
      formInput: updateState
    })
  }

  CheckLogin = () => {
    this.setState({
      loading: true
    })
    const data = {
      name: this.state.formInput.login.value,
      password: this.state.formInput.password.value
    }
    axios.post('/users/login', data)
    .then(response=>{
      this.setState({
        loading: false
      })
      const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000)
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('expirationDate', expirationDate)
      localStorage.setItem('user', response.data.userId)
      this.context.loginHandler()
    })
    .catch(err=>{
      this.setState({
        loading: false
      })
    })
  }

  registerHandler = () => {
    this.setState({
      loading: true
    })
    const data ={
      name: this.state.formInput.login.value,
      password: this.state.formInput.password.value
    }
    axios.post('/users/signup', data)
    .then(result =>{
      this.setState({
        loading: false,
        messageRes: 'Konto założone pomyślnie'
      })
      console.log(result.data)
    })
    .catch(err=>{
      this.setState({
        loading: false,
        messageRes: 'Sprobuj ponownie, wystapił błąd'
      })
      console.log(err)
    })
  }


  render(){
    const inputsArray = [];
    for (let key in this.state.formInput){
      inputsArray.push({
        id: key,
        config: this.state.formInput[key]
      })
    }

    let inputs =(
      <>
      {inputsArray.map(inputElement=>(
        <Input
        className='input-lodig-password'
        key={inputElement.id} 
        elementType={inputElement.config.elementType}
        elementConfig={inputElement.config.elementConfig}
        value={inputElement.value}
        changed={(event)=>this.inputChangeHandler(event, inputElement.id)}
        />
      ))}
      </>
    ) 
     

    return(
      <div className='login'>
        <div className='card'>
          <div className='spider'>
          <img src={spider} alt='pajak'/> 
          </div>
          <p className='opis'>Zaloguj sie do własnej bazy filmów</p>
          <form className='login-inputy'>
             {inputs}
          </form>
            {this.state.loading ? <Spinner /> : 
            <>
            <button className='btn-login' onClick={this.CheckLogin}>Zaloguj sie</button>
            <div className="registration">{this.state.messageRes}</div>
            <button className='btn-login' onClick={this.registerHandler}>Załóż konto</button>
            </>}
        </div>
      </div>
    )
  }
}

export default Login

