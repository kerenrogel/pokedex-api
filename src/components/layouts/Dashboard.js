import React, { Component } from 'react';
import PokemonList from '../PokemonList';
import Pokemon from '../Pokemon';
import axios from 'axios';

class Dashboard extends Component {
  async handleClick (id) {
    const res = axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    this.setState({pokemon: res.data['results']});
    //console.log("results: " + JSON.stringify(res));
    console.log("results card: " + id);
    const pokemon = new Pokemon(id);
  }

  render () {
    return (
      <div className="container">
      	<div className="col-md-12">
          <div className="row">
              <div className="col-md-6">
              	<PokemonList  />	                    
  							</div>
  							<div className="col-md-6">
  								<Pokemon />
  							</div>
          </div>                       
        </div>
      </div>   
    );
  }
}

export default Dashboard;