import React from 'react';
import styled from 'styled-components';
import { Corgi } from 'Assets/Corgi';
import { TEAL, ORANGE, CREAM } from 'Styles/globalStyles';

export const Nav = props => {
	return (
		<nav>
			<NavStyles>
				<span className='shortly-home'>
					<span>
						<Corgi className='corgi-logo' />
					</span>
					<span>
						<h2 className='title-text'>Shortli</h2>
					</span>
				</span>
				<ul role='list' className='nav-options'>
					<li>
						<a className='why' href='#'>
							Why Shortli?
						</a>
					</li>
					<li>
						<a className='solutions' href='#'>
							Solutions
						</a>
					</li>
					<li>
						<a className='features' href='#'>
							Features
						</a>
					</li>
					<li>
						<a className='pricing' href='#'>
							Pricing
						</a>
					</li>
				</ul>
				<ul role='list' className='login-and-quote'>
					<li>
						<a href='#' className='log-in'>
							Log In
						</a>
					</li>
					<li>
						<a href='#' id='sign-up'>
							Sign up
						</a>
					</li>
					<li>
						<button className='quote-button' children='Get a Quote' />
					</li>
				</ul>
			</NavStyles>
		</nav>
	);
};

const NavStyles = styled.div`
	display: flex;
	align-items: center;
	margin: 0.5em auto;
	margin-bottom: 2em;

	@media (min-width: 800px) {
		justify-content: space-between;
	}

	.shortly-home {
		display: flex;
		justify-content: space-evenly;
		align-items: center;
		width: 15%;

		.title-text {
			font-family: sans-serif;
			color: ${ORANGE};
			font-weight: 300;
		}
	}

	.nav-options {
		margin: 0.5em auto;
		display: flex;
		justify-content: space-between;

		align-items: center;
		width: 30%;

		@media (min-width: 800px) {
			justify-content: space-around;
		}
	}

	.why,
	.solutions,
	.features,
	.pricing,
	.log-in {
		font-size: 0.8rem;
		color: black;

		:hover,
		:focus {
			color: ${TEAL};
		}
	}

	.login-and-quote {
		display: flex;
		justify-content: space-around;
		align-items: center;
		width: 25%;
	}

	#sign-up {
		color: ${TEAL};
		font-size: 0.8rem;

		:hover {
			color: ${ORANGE};
		}
	}

	.quote-button {
		background: ${TEAL};
		color: ${CREAM};
		font-size: 0.9rem;
		padding: 1em 1.5em;

        :hover,
		:focus {
			background-color: ${ORANGE};
		}
	}
`;
