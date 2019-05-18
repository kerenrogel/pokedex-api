import React from 'react';
import PokemonList from '../PokemonList';
import Pokemon from '../Pokemon';
import axios from 'axios';

const Dashboard = () => {

  

  // handleClick (id) {
  //  const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
  //  this.setState({pokemon: res.data['results']});
  //  console.log("results: " + JSON.stringify(res));
  // }

  return (
    <div className="container">
    	<div className="col-md-12">
        <div className="row">
            <div className="col-md-6">
            	<PokemonList />	                    
							</div>
							<div className="col-md-6">
								<Pokemon />
							</div>
        </div>                       
      </div>
    </div>   
  );
}

export default Dashboard;