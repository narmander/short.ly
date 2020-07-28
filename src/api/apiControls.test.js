const unmockedFetch = global.fetch;
import { createLink, deleteLink } from './apiControls';

describe('API Controls', () => {
	describe('createLink', () => {
		it('creates a new short link and returns it normalized with Dates', async () => {
			// setup
			const apiResponse = {
				url: 'closestcorgi.com',
				slug: 'GXK',
				short_url: 'http://bely.me/GXK',
			};
			global.fetch = () => Promise.resolve({ json: () => apiResponse });
			const dateProps = {
				created_at: expect.any(Date),
				expires_at: expect.any(Number),
			};
			const objIncludingDateProps = Object.assign(apiResponse, dateProps);

			//execution
			const normalizedObj = await createLink('closestcorgi.com');

			//expectation
			expect(normalizedObj).toEqual(
				expect.objectContaining({ error: false, result: objIncludingDateProps })
			);
			//tear down
			global.fetch = unmockedFetch;
		});
	});

	describe('deleteLink', () => {
		it('returns error message if API deletion failed', async () => {
			// setup
			const apiResponse = {
				status: 404,
				statusText: 'Not found',
			};
			global.fetch = () => Promise.resolve(apiResponse);
			const slugThatDoesNotExist = 'foobarbaz';

			//execution
			const failedDeletion = await deleteLink(slugThatDoesNotExist);

			// expectation
			expect(failedDeletion).toEqual({ error: true, result: 'Not found' });

			//tear down
			global.fetch = unmockedFetch;
		});
	});
});
