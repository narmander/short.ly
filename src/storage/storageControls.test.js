const unmockedStorage = Storage;
import { updateCache, slugExists, removeLink, separateExpiredLinks } from './storageControls';

describe('localStorage controls', () => {
	describe('updateCache', () => {
		it('stores new link entry slug look up and updates entire links cache', () => {
			const storage = jest.spyOn(Storage.prototype, 'setItem');
			const someLinkEntry = {
				url: expect.any(String),
				slug: expect.any(String),
				short_url: expect.any(String),
				created_at: expect.any(String),
				expires_at: expect.any(Number),
			}
			const cache = [someLinkEntry];

			updateCache(cache, someLinkEntry);
			
			expect(storage).toHaveBeenCalledWith(someLinkEntry.slug, someLinkEntry.slug);
			expect(storage).toHaveBeenCalledWith('links', JSON.stringify(cache));
		});
	});

	describe('slugExists', () => {
		it('tells you if slug already exists in storage', () => {
			Storage.prototype.getItem = jest.fn(() => 'slug');
			const slugDoesExist = true;
			const slug = 'slug';

			const answer = slugExists(slug);

			expect(answer).toBe(slugDoesExist);

			Storage.prototype.getItem = unmockedStorage.prototype.getItem;
		});
	});

	describe('removeLink', () => {
		it('removes slug from slug lookup and updates entire links cache', () => {
			const removal = jest.spyOn(Storage.prototype, 'removeItem');
			const slug = 'slug';
			const someLinkEntry = {
				url: expect.any(String),
				slug: slug,
				short_url: expect.any(String),
				created_at: expect.any(String),
				expires_at: expect.any(Number),
			}
			const cache = [someLinkEntry];
			const emptyCache = [];

			removeLink(slug, cache);

			expect(removal).toHaveBeenCalledWith(slug);
		});
	});

	describe('separateExpiredLinks', () => {
		it('updates cache with unexpired links and returns expired links', () => {
			const removal = jest.spyOn(Storage.prototype, 'removeItem');
			const slug = 'slug';
			const someLinkEntry = {
				url: expect.any(String),
				slug: slug,
				short_url: expect.any(String),
				created_at: expect.any(String),
				expires_at: 1,
			}
			const cache = [someLinkEntry];

			const expiredLinks = separateExpiredLinks(cache);

			expect(removal).toHaveBeenCalledWith(slug);
			expect(expiredLinks).toEqual(cache);
		});
	});
});
