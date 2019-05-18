import React, { Component } from 'react';
import styled from 'styled-components';
import spinner from '../components/spinner.gif';
import '../components/styles/PokeCards.css';
import { Link } from 'react-router-dom';
import Pokemon from './Pokemon';
import axios from 'axios';

const Sprite = styled.img`
	width: 5em;
	height: 5em;
`;

const StyledLink =  styled(Link)`
	text-decoration: none;
	color: black;
	&:focus,
	&:hover,
	&:visited,
	&:link,
	&:active{
		text-decoration: none;
	}	
`;


class PokemonCard extends Component {
	state ={
		name: '',
		imageUrl: '',
		pokemonIndex: '',
		imageLoading: true,
		toManyRequests: false,
		pokemon: {}
	};

	// async handleClick (id) {
	// 	const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
	// 	this.setState({pokemon: res.data['results']});
	// 	console.log("results: " + JSON.stringify(res));
	
	// }

	componentDidMount() {
		const name =  this.props.name;
		const url = this.props.url;
		const pokemonIndex = url.split('/')[url.split('/').length - 2];
		const imageUrl = `https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/${pokemonIndex}.png?raw=true`
	
		this.setState({
			name,
			imageUrl,
			pokemonIndex
		});
	}

  render() {
	return(
		<div className="col-md-3 col-sm-6 mb-2">
			<StyledLink to={`${this.state.pokemonIndex}`}>
			<div className="card">
				{this.state.imageLoading ? (
					<img 
						src={spinner} 
						style={{ width: '3em', height: '3em' }}
						className="card-img-top rounded mx-auto d-block mt-4" 
					/>
				) : null}
				<Sprite 
					onClick={() => this.handleClick(this.state.pokemonIndex)}
					className="card-img-top rounded mx-auto mt-2"
					onLoad={() => this.setState({ imageLoading: false })}
					onError={() => this.setState({ toManyRequests: true })}
					src={this.state.imageUrl}
					style={
						this.state.toManyRequests
						? { display: 'none' }
						: this.state.imageLoading
						? null
						: { display: 'block' }
					}
				/>
				{this.state.toManyRequests ? (
					<h6 className="mx-auto">
						<span className="badge badge-danger mt-6">Too Many Request</span>
					</h6>
					) : null
				}
				<div className="card-body mx-auto">
					<small className="card-title">{this.state.name
						.toLowerCase()
						.split(' ')
						.map(
							letter => letter.charAt(0).toUpperCase() + letter.substring(1)
						)
						.join(' ')
					}
					</small>
				</div>
			</div>
		  </StyledLink>
		</div>
	);
	}
}

export default PokemonCard;