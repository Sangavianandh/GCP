import React, {Component} from 'react'
import './App.css';
import Main from './component/Main'
import { Route, Switch,BrowserRouter, Redirect, Router } from 'react-router-dom';
import Createform from './component/Createform'

class App extends Component{
 
    render(){
    return (
      <div>
        <BrowserRouter>
        <Switch>
        <Route path="/" exact component={Main} />
        <Route path="/createform" exact component={Createform}/>
        </Switch>
        </BrowserRouter>
    {/* <Main/> */}
    </div>
)
}
}

export default App;