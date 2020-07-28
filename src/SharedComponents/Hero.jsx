import React from 'react';
import styled from 'styled-components';
import { TurningCorgi } from 'Assets/TurningCorgi';
import { TEAL, CREAM, ORANGE } from 'Styles/globalStyles';

export const Hero = ({
	mainText,
	subText,
	buttonText,
	buttonColor,
	buttonTextcolor,
	HeroImage,
	action,
	...props
}) => {
	return (
		<HeroStyles className='hero-container'>
			<div className='hero-text'>
				<div>
					<h1 className='main-text'>{mainText}</h1>
					<span className='sub-text'>{subText}</span>
				</div>

					<button className='action-button'>{buttonText}</button>

			</div>
			<div className='hero-image-container'>
				<TurningCorgi id='hero-image' />
			</div>
		</HeroStyles>
	);
};

const HeroStyles = styled.div`
	display: flex;
	justify-content: space-around;

	.hero-text {
		display: flex;
		flex-direction: column;
        align-items: flex-start;
        
	}

	.main-text {
        margin-top: 2em;
		font-size: 3rem;
		font-family: 'Arial Black', sans-serif;
	}

	.sub-text {
		font-size: 0.9rem;
        
	}

	.action-button {
		background: ${TEAL};
		color: ${CREAM};
		font-size: 1.8rem;
        margin-top: 2em;
        padding: .5em 2em;

		:hover,
		:focus {
			background-color: ${ORANGE};
		}
	}
`;
