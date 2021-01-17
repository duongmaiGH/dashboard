import React from 'react';
import { Link } from "react-router-dom";
import '../scss/_landing.scss';
import logo from '../img/logo.png';

const LandingHeader = () => {
	return (
		<header className="landing-header">
			<div className="landing-header__section">
				<img className="landing-header__logo" src={logo} />
			</div>
			<div className="landing-header__section">
				<ul className="landing-header__list">
					<li className="landing-header__li">
						<Link to="/signin" className="btn-transparent">
							Login
						</Link>
					</li>
					<li className="landing-header__li">
						<Link to="/signup" className="btn">
							Sign Up
						</Link>
					</li>
				</ul>
			</div>
		</header>
	);
}

export default LandingHeader;
