import { updateCache, makeHash } from './storageControls';

describe('localStorage controls', () => {
	describe('makeHash', () => {
		it('returns a string of slug chararcter codes', () => {
			const slug = 'abc';
			const hash = '979899';

			let result = makeHash(slug);
			
			expect(result).toBe(hash);
		});
	});

	xdescribe('updateCache', () => {
		it('adds a url entry with new date properties to storage', () => {
			const newLinkData = {
				url: expect.any(String),
				slug: expect.any(String),
				short_url: expect.any(String),
			};
			const additionalProperties = {
				created_at: expect.any(Date),
				expires_at: expect.any(Number),
			};
			const finalObject = Object.assign(newLinkData, additionalProperties);

			const newEntry = updateCache(newLinkData, 60000);

			expect(newEntry).toBe(finalObject);
		});
	});

	xdescribe('removeLink', () => {
		it('states link does not exist if not in ', () => {
			let expired = expireLink('hi');

			expect(expired).toBe(true);
		});
	});
});

// so we can separate other database categories like users
// in the future
