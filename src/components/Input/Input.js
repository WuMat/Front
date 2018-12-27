import React from 'react'
import './Input.css'

class Input extends React.Component{
  render(){
    return(
      <input
      className={this.props.className ? this.props.className :'input'}
      {...this.props.elementConfig}
      value={this.props.value}
      onChange={this.props.changed}/>
    )
  }
}

export default React.memo(Input)