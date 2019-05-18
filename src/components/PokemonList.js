import React, { Component } from 'react';
import axios from 'axios';
import PokemonCard from './PokemonCard';
import './styles/PokeList.css'
import Dashboard from './layouts/Dashboard';


class PokemonList extends Component {
	constructor(props){
		super();
	 	this.state = {
			url: 'https://pokeapi.co/api/v2/pokemon/?limit=8',
			pokemon: null,
			pokemonLink: "Change me"
		}
	}

	async componentDidMount() {
		const res = await axios.get(this.state.url);
		this.setState({pokemon: res.data['results']});
	}

	onChangePokemon(pokemonLink) {
		this.props.changePokemon(this.state.pokemonLink);
	
	}
  render() {
    return(
			<React.Fragment>
				{this.state.pokemon ? ( 
					<div className="row pokemon-list=">
						{this.state.pokemon.map(pokemon => (

							<PokemonCard
								key={pokemon.name} 
								name={pokemon.name}
								url={pokemon.url}
							/>
						))} 
						<button onClick={this.props.greet}>keren</button>
						<button onClick={() => this.onChangePokemon()}>change</button>
					</div>
				) : ( 
				<h6>Getting pokemon...</h6>
				)}
			</React.Fragment>
		);
	}
}

export default PokemonList;
