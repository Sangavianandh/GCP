import React, {Component} from 'react'
import { Redirect , Link} from "react-router-dom";
class Main extends Component{
    
    render(){ 
    return (
    <div>
        <Link to={{ pathname: `/createform` }} > create </Link>
      {/* <button className='create'> create</button> */}
      <button className='view'> ViewAll </button>
    </div>
)
}
}   

export default Main;