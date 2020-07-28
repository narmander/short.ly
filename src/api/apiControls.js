import { headers, errorFoundIn } from '../utils/utility';

export const createLink = async (longURL, customSlug = null, ttl = 60000) => {
	const response = await fetch(
		process.env.API_URL,
		headers(
			'POST',
			customSlug ? { url: longURL, slug: customSlug } : { url: longURL }
		)
	).then(async res => {
		if (errorFoundIn(res)) {
			return { error: true, result: res.statusText };
		} else {
			const linkDetails = await res.json();

			const normalizedEntry = Object.assign(linkDetails, {
				created_at: new Date(),
				expires_at: new Date().getTime() + ttl,
			});
			return { error: false, result: normalizedEntry };
		}
	});

	return response;
};

export const deleteLink = () => {
    
};
