import React, {  Component } from 'react';
import NavBar from './components/layouts/NavBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Dashboard from './components/layouts/Dashboard';
import Pokemon from './components/Pokemon';
import { HashRouter as  Router, Switch, Route } from 'react-router-dom';


class App extends Component {
	render() {
		return(
      <div className="App">
        <NavBar />
        <Dashboard /> 
      </div>
		);
	}
}

export default App;
