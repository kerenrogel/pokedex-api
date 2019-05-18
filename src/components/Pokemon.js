import React, { Component } from 'react';
import axios from 'axios';


const TYPE_COLORS = {
	bug: 'B1C12E',
	dark: '4F3A2D',
	normal: 'C8C4BC',
	poison: '934594',
	grass: '74C236'
}

class Pokemon extends Component {
  constructor(props) {
    super(props);
    
    // Initialized, but not enough
    this.state = { types: [], name: '', stats:'' };
  }
	state = {
		id: '',
		name: '',
		pokemonIndex: '',
		imageUrl: '',
		types: [],
		description: '',
		stats: {
			hp: '',
			attack: '',
			defense: '',
			speed: '',
			specialAttack: '',
			specialDefense: '',
		},

		height: '',
		weight: '',
		eggGroup: '',
		abilities: '',
		genderRatioMale: '',
		genderRatioFemale: '',
		evs: '',
		hatchSteps: ''
	};

	async componentDidMount() {
		console.log("id is: " + this.state.id);
		const pokemonIndex = this.props.testLink;
		console.log("hello here:" + pokemonIndex);

		// URL for pokemon information
		const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonIndex}/`;
		const pokemonSpeciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${pokemonIndex}/`;

		// Get pokemon Information
		const pokemonRes = await axios.get(pokemonUrl);
		
		const name = pokemonRes.data.name;
		const imageUrl = pokemonRes.data.sprites.front_default;

		let { hp, attack, defense, speed, specialAttack, specialDefense } = "";

		pokemonRes.data.stats.map(stat => {
			switch(stat.stat.name) {
				case 'hp':
					hp = stat['base_stat'];
				break;

				case 'attack':
					attack = stat['base_stat'];
				break;

				case 'defense':
					defense = stat['base_stat'];
				break;

				case 'speed':
					speed = stat['base_stat'];
				break;

				case 'special-attack':
					specialAttack = stat['base_stat'];
				break;

				case 'special-defense':
					specialDefense = stat['base_stat'];
				break;
			}
		});

		const height =
			Math.round((pokemonRes.data.height * 0.328884 + 0.0001) * 100) / 100;

		const weight =
			Math.round((pokemonRes.data.weight * 0.220462 + 0.0001) * 100) / 100;

		const types = pokemonRes.data.types.map(type => type.type.name);
	
		const abilities = pokemonRes.data.abilities.map(ability => {
			return ability.ability.name
				.toLowerCase()
				.split("-")
				.map(s => s.charAt(0).toUpperCase() + s.substring(1))
				.join(", ");
		})
		.join(', ');

		const evs = pokemonRes.data.stats
			.filter(stat => {
			if (stat.effort > 0) {
				return true;
			}
			return false;
		})
		.map(stat => {
			return `${stat.effort} ${stat.stat.name
				.toLowerCase()
				.split("-")
				.map(s => s.charAt(0).toUpperCase() + s.substring(1))
				.join(" ")}`;
		})
		.join('. ');

		// Get Pokemon Description, Catch Rate, Eggroup, Gender
	 axios.get(pokemonSpeciesUrl).then(res => {
		let description = '';
		res.data.flavor_text_entries.some(flavor => {
			if (flavor.language.name === 'en') {
				description = flavor.flavor_text;
			}
		});

		const femaleRate = res.data['gender_rate'];
		const genderRatioFemale = 12.5 * femaleRate;
		const genderRatioMale = 12.5 * ( 8 - femaleRate);

		const catchRate = Math.round((100 / 255) * res.data['capture_rate']);
		
		const eggGroups = res.data['egg_groups']
			.map(group => {
				return group.name
					.toLowerCase()
					.split("-")
					.map(s => s.charAt(0).toUpperCase() + s.substring(1))
					.join(" ");
			})
			.join(", ");

		const hatchSteps = 255 * (res.data['hatch_counter'] + 1);
		
		this.setState({
			description,
			genderRatioFemale,
			genderRatioMale,
			catchRate,
			eggGroups,
			hatchSteps
		});
	});

	

	this.setState({
		imageUrl,
		pokemonIndex,
		name,
		types,
		stats: {
			hp,
			attack,
			defense,
			speed,
			specialAttack,
			specialDefense
		},
		height,
		weight,
		abilities,
		evs
	});	
}



	render() {
		return (
			<div className="col">
				<div className="card">
					<div className="card-header">
						<div className="row">
							<div className="col-5">
								<h5>{this.props.testLink}</h5>
								<h2>{this.props.testLink}</h2>
							</div>
							<div className="col-7">
								<div className="float-right">
									{this.state.types.map(type => (
										<span 
											key={type}
											className="badge badge-pill mr-1"
											style={{
												backgroundColor: `#${TYPE_COLORS[type]}`,
												color: 'white'
											}}
										>
											{type
												.toLowerCase()
												.split("-")
												.map(s => s.charAt(0).toUpperCase() + s.substring(1))
												.join(" ")}
										</span>
									))}
								</div>
							</div>
						</div>
					</div>
					<div className="card-body">
						<div className="row align-items-center">
							<div className="col-md-3">
								<img 
									className="card-img-top mx-auto mt-2"
									src={this.state.imageUrl}
								/>
							</div>
							<div className="col-md-9">
								<h4 className="mx-auto">
									{this.state.name
										.toLowerCase()
										.split("-")
										.map(s => s.charAt(0).toUpperCase() + s.substring(1))
										.join(" ")
									}
								</h4>

								<div className="row align-items-center">
									<div className="col-12 col-md-3">HP</div>
									<div className="col-12 col-md-8">
										<div className="progress">
											<div 
												className="progress-bar"
												role="progressBar"
												style={{
													width: `${this.state.stats.hp}%`
												}}
												aria-valuenow="25"
												aria-valuemin="0"
												aria-valuemax="100"
											>
											<small>{this.state.stats.hp}</small>
											</div>
										</div>
									</div>
								</div>

								<div className="row align-items-center">
									<div className="col-12 col-md-3">Attack</div>
									<div className="col-12 col-md-8">
										<div className="progress">
											<div 
												className="progress-bar"
												role="progressBar"
												style={{
													width: `${this.state.stats.attack}%`
												}}
												aria-valuenow="25"
												aria-valuemin="0"
												aria-valuemax="100"
											>
											<small>{this.state.stats.attack}</small>
											</div>
										</div>
									</div>
								</div>

								<div className="row align-items-center">
									<div className="col-12 col-md-3">Defense</div>
									<div className="col-12 col-md-8">
										<div className="progress">
											<div 
												className="progress-bar"
												role="progressBar"
												style={{
													width: `${this.state.stats.defense}%`
												}}
												aria-valuenow="25"
												aria-valuemin="0"
												aria-valuemax="100"
											>
											<small>{this.state.stats.defense}</small>
											</div>
										</div>
									</div>
								</div>

								<div className="row align-items-center">
									<div className="col-12 col-md-3">Speed</div>
									<div className="col-12 col-md-8">
										<div className="progress">
											<div 
												className="progress-bar"
												role="progressBar"
												style={{
													width: `${this.state.stats.speed}%`
												}}
												aria-valuenow="25"
												aria-valuemin="0"
												aria-valuemax="100"
											>
											<small>{this.state.stats.speed}</small>
											</div>
										</div>
									</div>
								</div>

								<div className="row align-items-center">
									<div className="col-12 col-md-3">Special Attack</div>
									<div className="col-12 col-md-8">
										<div className="progress">
											<div 
												className="progress-bar"
												role="progressBar"
												style={{
													width: `${this.state.stats.specialAttack}%`
												}}
												aria-valuenow="25"
												aria-valuemin="0"
												aria-valuemax="100"
											>
											<small>{this.state.stats.specialAttack}</small>
											</div>
										</div>
									</div>
								</div>

								<div className="row align-items-center">
									<div className="col-12 col-md-3">Special Defense</div>
									<div className="col-12 col-md-8">
										<div className="progress">
											<div 
												className="progress-bar"
												role="progressBar"
												style={{
													width: `${this.state.stats.specialDefense}%`
												}}
												aria-valuenow="25"
												aria-valuemin="0"
												aria-valuemax="100"
											>
											<small>{this.state.stats.specialDefense}</small>
											</div>
										</div>
									</div>
								</div>

							</div>
						</div>
						<div className="row mx-2">
							<medium>{this.state.description}</medium>
						</div>
						<hr/>
						<div className="card-body">
							<h5 className="card-title text-center">Profile</h5>
							<div className="row">
								<div className="col-md-6">
									<div className="row">
										<div className="col-md-6">
											<h6 className="float-right"> Height:</h6>
										</div>
										<div className="col-md-6">
											<h6 className="float-left"> {this.state.height} ft.</h6>
										</div>
									</div>

									<div className="row">
										<div className="col-md-6">
											<h6 className="float-right"> Weight:</h6>
										</div>
										<div className="col-md-6">
											<h6 className="float-left"> {this.state.weight} lbs</h6>
										</div>
									</div>

									<div className="row">
										<div className="col-md-6">
											<h6 className="float-right"> Catch Rate:</h6>
										</div>
										<div className="col-md-6">
											<h6 className="float-left"> {this.state.catchRate}%</h6>
										</div>
									</div>

									<div className="row">
										<div className="col-md-6">
											<h6 className="float-right"> Gender Ratio:</h6>
										</div>
										<div className="col-md-6">
											<div className="progress">
												<div 
													className="progress-bar"
													role="progressBar"
													style={{
														width: `${this.state.genderRatioFemale}%`,
														backgroundColor: '#C2185B'
													}}
													aria-valuenow="15"
													aria-valuemin="0"
													aria-valuemax="100"
												>
												<small>{this.state.genderRatioFemale}</small>
												</div>

												<div 
													className="progress-bar"
													role="progressBar"
													style={{
														width: `${this.state.genderRatioMale}%`,
														backgroundColor: '#1976D2'
													}}
													aria-valuenow="30"
													aria-valuemin="0"
													aria-valuemax="100"
												>
												<small>{this.state.genderRatioMale}</small>
												</div>


											</div>
										</div>
									</div>
								</div>

								<div className="col-md-6">
									<div className="row">
										<div className="col-md-6">
											<h6 className="float-right"> Egg Groups:</h6>
										</div>
										<div className="col-md-6">
											<h6 className="float-left"> {this.state.eggGroups}</h6>
										</div>

										<div className="col-md-6">
											<h6 className="float-right"> Hatch Steps:</h6>
										</div>
										<div className="col-md-6">
											<h6 className="float-left"> {this.state.hatchSteps}</h6>
										</div>

										<div className="col-md-6">
											<h6 className="float-right"> Abilities:</h6>
										</div>
										<div className="col-md-6">
											<h6 className="float-left"> {this.state.abilities}</h6>
										</div>

										<div className="col-md-6">
											<h6 className="float-right"> EVs:</h6>
										</div>
										<div className="col-md-6">
											<h6 className="float-left"> {this.state.evs}</h6>
										</div>

									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Pokemon;