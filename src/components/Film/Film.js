import React from 'react'
import './Film.css'

class Film extends React.Component{
  render(){
    return(
      <div className='film'>
        <div className='descripotion'>
          <p>{this.props.titlePl}</p>
          <p>{this.props.title}</p>
          <p>{this.props.size}</p>
          <p>{this.props.diskName}</p>
        </div>
        <div className='delete' onClick={this.props.delete}>
          <i className="fas fa-ban"></i>
        </div>
      </div>
    )
  }
}

export default React.memo(Film)