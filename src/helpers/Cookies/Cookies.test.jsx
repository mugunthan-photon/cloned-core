import { describe, it } from 'mocha';
import { expect } from 'chai';
import Cookies from './Cookies';

describe('Cookies', () => {
    describe('should be able to get and set Cookies data for', () => {
        it('Cookies::get() and set()', () => {
            Cookies.remove('test', '');
            Cookies.save('test', 't1', 10, '');
            const result = Cookies.load('test');
            expect(result).to.equal('t1');
        });

        it('Cookies:: Remove', () => {
            Cookies.remove('test', '');
            const result1 = Cookies.load('test');
            expect(result1).not.equal('1');
        });

        it('Cookies:: Remove with out params', () => {
            Cookies.remove();
        });

        it('and throws exception on server side', () => {
            const isServerSide = global.__SERVER__;
            global.__SERVER__ = true;

            Cookies.save('test', '1', 10);
            Cookies.remove('');
            global.__SERVER__ = isServerSide;
        });
    });
});
