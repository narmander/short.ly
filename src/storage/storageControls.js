export const getLinks = () => {
	return JSON.parse(localStorage.getItem('links'));
};

export const updateCache = (cache, linkEntry) => {
	if (linkEntry) {
		cache.push(linkEntry);
		localStorage.setItem(linkEntry.slug, linkEntry.slug);
	}

	localStorage.setItem('links', JSON.stringify(cache));
};

export const slugExists = slug => {
	if (slug === undefined) return false;

	const slugIsInCache = localStorage.getItem(slug);

	if (slugIsInCache) {
		return true;
	} else {
		return false;
	}
};

export const removeLink = (slug, cache) => {
	localStorage.removeItem(slug);

	const filteredCache = cache.filter(linkEntry => {
		return linkEntry.slug !== slug;
	});

	updateCache(filteredCache);
};

export const separateExpiredLinks = () => {
	const links = getLinks();
	const expired = [];
	const now = new Date();

	const unexpired = links.filter((linkEntry, i) => {
		if (now.getTime() > linkEntry.expires_at) {
			expired.push(linkEntry);
			localStorage.removeItem(linkEntry.slug);
		} else {
			return true;
		}
	});

	updateCache(unexpired);

	return expired;
};
