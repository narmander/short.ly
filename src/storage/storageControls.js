export const getLinks = () => {
	return JSON.parse(localStorage.getItem('links'));
};

export const makeHash = (slug) =>  {
	let hash = '';

	slug.split('').forEach((character, i) => {
		hash += slug.charCodeAt(i);
	});

	return hash;
};

export const updateCache = (linkEntry, cache) => {
	const index = makeHash(linkEntry.slug);

	cache[index] = linkEntry;

	localStorage.setItem('links', JSON.stringify(cache));
};

// make faster with a hashes obj in localstorage
// add to check if url is taken since it is not consistent
// store at index in an ARRAY created by getting charcode of slug chars
// then when you map the data filter.((item) => item !== null)
// or see if it naturally skips nulls (if time)
export const slugExists = (slug, cache) => {
	if (slug === undefined) return false;

	let hash = makeHash(slug);

	if (cache[hash] && cache[hash].slug === slug) {
		return true;
	} else {
		return false;
	}
};

export const removeLink = (slug, cache) => {
	for (let i = 0; i < cache.length; i++) {
		if (cache[i].slug === slug) {
			cache.splice(i, 1);
			updateCache({ cache });
			return cache;
		}
	}
};
