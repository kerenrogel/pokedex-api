import React from 'react';
import PokemonList from '../PokemonList';
import Pokemon from '../Pokemon';


const Dashboard = () => {
  return (
    <div className="container">
    	<div className="col-md-12">
        <div className="row">
            <div className="col-md-6">
            	<Dashboard />	                    
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