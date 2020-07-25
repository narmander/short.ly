// CONSTANTS

export const headers = (method = 'GET', data = '') => {
	return {
		method: method,
		mode: 'cors',
		cache: 'no-cache',
		headers: {
			'GB-Access-Token': process.env.GB_ACCESS_TOKEN,
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	};
};
