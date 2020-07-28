// CONSTANTS
export const TIME_TO_LIVE = 600000; // 10 minutes in milliseconds for demo purposes
export const POST = 'POST';
export const DELETE = 'DELETE';

// UTILITY FUNCTIONS
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

export const errorFoundIn = res => {
	if (res.status === 401 || res.status === 404 || res.status === 422) {
		return true;
	}
};

export const timeLeft = (expires_at) => {
	let timeLeft = Math.abs(expires_at - new Date().getTime())/1000;

	const days = Math.floor(timeLeft / 86400);
	timeLeft -= days * 86400;

	// calculate (and subtract) whole hours
	const hours = Math.floor(timeLeft / 3600) % 24;
	timeLeft -= hours * 3600;

	// calculate (and subtract) whole minutes
	const minutes = Math.floor(timeLeft / 60) % 60;
	timeLeft -= minutes * 60;

	// returning minutes for demo purposes but we could return other data too

	return minutes;
};
