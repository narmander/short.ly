import React, { useEffect } from 'react';
import { headers } from 'Utils/utility';

export const URLManager = () => {
	// post new url

	async function createLink(longURL) {
		const response = await fetch(
			process.env.API_URL,
			headers('POST', { url: longURL })
        ).then(res => res.json());
        
        
	}

	return <div onClick={() => createLink('https://www.gold.com/')}>bye</div>;
};
