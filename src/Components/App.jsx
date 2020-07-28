import React, { useEffect, useReducer } from 'react';
import { Nav } from './Nav';
import { LinkManager } from './LinkManager/LinkManager';
import { TurningCorgi } from 'Assets/TurningCorgi';
import { GlobalStyles } from 'Styles/globalStyles';

export const App = () => {
	return (
		<>
			<GlobalStyles />
			<Nav />
			<TurningCorgi />
			<LinkManager />
		</>
	);
};
