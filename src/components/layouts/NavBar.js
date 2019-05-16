import React, { Component } from 'react';
import styled from 'styled-components';

class NavBar extends Component {

	

	render() {
		const NavBarStyle = styled.nav``;

		const Branding = styled.a`
		  -moz-user-select: none;
		  -website-user-select: none;
		  -ms-user-select: none;
		  user-select: none;
		  -o-user-select: none;
		`;

		return(
	    <NavBarStyle className="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
        <Branding
	        href="#"
	        className="navbar-brand col-sm-3 col-md-2 mr-0 align-items-center"
	      >
	        RéactDex
	      </Branding>
	    </NavBarStyle>
  	);
  }a
}

export default NavBar;