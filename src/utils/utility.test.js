import { timeLeft, TIME_TO_LIVE } from './utility';

describe('timeLeft', () => {
    it('returns minutes left until expiration given expiration date ', () => {
        const expirationDateInMilliseconds = new Date().getTime() + TIME_TO_LIVE;
        const minutesLeft = 10;

        const result = timeLeft(expirationDateInMilliseconds);

        expect(result).toBe(minutesLeft);
    });
    
});
