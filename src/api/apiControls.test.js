const unmockedFetch = global.fetch;
import { createLink, deleteLink } from './apiControls';

beforeAll(() => {
	const apiResponse = {
		url: 'closestcorgi.com',
		slug: 'GXK',
		short_url: 'http://bely.me/GXK',
	};
	global.fetch = () => Promise.resolve({ json: () => apiResponse });
});

afterAll(() => {
	global.fetch = unmockedFetch;
});

describe('API Controls', () => {
	describe('createLink', () => {
		it('creates a new short link and returns it normalized with Dates', async () => {
			const apiResponse = {
				url: 'closestcorgi.com',
				slug: 'GXK',
				short_url: 'http://bely.me/GXK',
			};
			const dateProps = {
				created_at: expect.any(Date),
				expires_at: expect.any(Number),
			};

			const objIncludingDateProps = Object.assign(apiResponse, dateProps);

			const normalizedObj = await createLink('closestcorgi.com');

			expect(normalizedObj).toEqual(
				expect.objectContaining({error: false, result: objIncludingDateProps })
			);
		});
	});
});
