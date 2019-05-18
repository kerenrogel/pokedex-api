import React, { Component } from 'react';
import axios from 'axios';
import PokemonCard from './PokemonCard';
import './styles/PokeList.css'
import Dashboard from './layouts/Dashboard';


class PokemonList extends Component {
 	state = {
		url: 'https://pokeapi.co/api/v2/pokemon/?limit=8',
		pokemon: null
	};

	async componentDidMount() {
		const res = await axios.get(this.state.url);
		this.setState({pokemon: res.data['results']});
	}
  render() {
    return(
			<React.Fragment>
				{this.state.pokemon ? ( 
					<div className="row pokemon-list">
						{this.state.pokemon.map(pokemon => (
							<PokemonCard
								key={pokemon.name} 
								name={pokemon.name}
								url={pokemon.url}
								id="3"
							/>
						))} 
					</div>
				) : ( 
				<h6>Getting pokemon...</h6>
				)}
			</React.Fragment>
		);
	}
}

export default PokemonList;
