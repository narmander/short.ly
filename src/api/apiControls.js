import {
	headers,
	errorFoundIn,
	TIME_TO_LIVE,
	POST,
	DELETE,
} from '../utils/utility';

export const createLink = async (longURL, customSlug = null) => {
	const response = await fetch(
		process.env.API_URL,
		headers(
			POST,
			customSlug ? { url: longURL, slug: customSlug } : { url: longURL }
		)
	).then(async res => {
		if (errorFoundIn(res)) {
			return { error: true, result: res.statusText };
		} else {
			const linkDetails = await res.json();

			const normalizedEntry = Object.assign(linkDetails, {
				created_at: new Date(),
				expires_at: new Date().getTime() + TIME_TO_LIVE,
			});
			return { error: false, result: normalizedEntry };
		}
	});

	return response;
};

export const deleteLink = async slug => {
	const response = await fetch(
		`${process.env.API_URL}${slug}`,
		headers(DELETE)
	).then(res => {
		if(errorFoundIn(res)) {
			return { error: true, result: res.statusText};
		} else {
			return { error: false }
		}
	});

	return response;
};
