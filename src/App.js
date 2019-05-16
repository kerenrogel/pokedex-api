import React, {  Component } from 'react';
import NavBar from './components/layouts/NavBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Dashboard from './components/layouts/Dashboard';
import { HashRouter as  Router, Switch, Route } from 'react-router-dom';
import Pokemon from './components/Pokemon';

class App extends Component {
	render() {
		return(
			<Router>
		    <div className="App">
			    <NavBar />
			    <div className="container">
			    	<Switch>
			    		<Route exact path="/" component={Dashboard} />
			    		<Route exact path="/pokemon/:pokemonIndex" component={Pokemon} />			    
				    </Switch>
			    </div>
		    </div>
	   </Router>
		);
	}
}

export default App;
