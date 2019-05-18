import React, { Component } from 'react';
import PokemonList from '../PokemonList';
import Pokemon from '../Pokemon';
import axios from 'axios';

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      testLink: "5",
      pokemonIndex: ''
    }
  }
  onGreet() {
    alert("Im clicked!");
  }

  async handleClick (id) {
    const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    this.setState({pokemon: res.data['results']});
    //console.log("results: " + JSON.stringify(res));
    console.log("results card: " + id);
    const pokemon = new Pokemon(id);
  
  }
  

  onChangePokemonName(newPokemon){
    this.setState({
      testLink: newPokemon
    });
  }
  render () {
    return (
      <div className="container">
      	<div className="col-md-12">
          <div className="row">
              <div className="col-md-6">
              	<PokemonList 
                  greet={this.onGreet}
                  changePokemon={this.onChangePokemonName.bind(this)} 
                   />	                    
  							</div>
  							<div className="col-md-6">
  								<Pokemon testLink={this.state.testLink} />
  							</div>
          </div>                       
        </div>
      </div>   
    );
  }
}

export default Dashboard;