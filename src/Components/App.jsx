import React from 'react';

import { Nav } from './Nav';
import { LinkManager } from './LinkManager';
import { Hero } from 'SharedComponents/Hero';
import { GlobalStyles } from 'Styles/globalStyles';

export const App = () => {
	return (
		<>
			<GlobalStyles />
			<Nav />
			<Hero
				mainText='Smart and Short'
				subText='Cut down the excess, and keep the power with Shortli links!'
				buttonText='Try for free!'
			/>
			<LinkManager />
		</>
	);
};
