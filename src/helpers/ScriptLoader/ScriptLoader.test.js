import { describe, it } from 'mocha';
import { expect } from 'chai';
import { assert, spy, stub } from 'sinon';
import ScriptLoader from './ScriptLoader';

describe('ScriptLoader', () => {
    it('exists', () => {
        expect(ScriptLoader).to.exists;
    });

    describe('has valid', () => {
        it('method load', function(done) { // eslint-disable-line
            expect(ScriptLoader).to.have.property('load');
            expect(typeof ScriptLoader.load).equals('function');

            const loadSpy = spy(ScriptLoader, 'load');

            this.timeout(10000);
            ScriptLoader.load({
                src: 'http://www.google-analytics.com/analytics.js',
                onSuccess: () => {
                    done();
                },
                onError: () => {
                    done();
                },
            });

            assert.calledOnce(loadSpy);

            loadSpy.restore();
        });
    });

    describe('egde case valid', () => {
        it('method load', function(done) { // eslint-disable-line
            expect(ScriptLoader).to.have.property('load');
            expect(typeof ScriptLoader.load).equals('function');

            // const loadSpy = spy(ScriptLoader, 'load');
            const appendChild = stub(document.body, 'appendChild', (script) => {
                script.onload();
            });

            this.timeout(10000);
            ScriptLoader.load({
                src: 'https://www.google-analytics.com/analytics.js?test=2',
            });
            setTimeout(() => {
                done();
                appendChild.restore();
                // assert.calledOnce(loadSpy);
                // loadSpy.restore();
            });
        });
    });

    describe('should degrade gracefully', () => {
        it('and throws exception on server side', (done) => {
            const isServerSide = global.__SERVER__;
            global.__SERVER__ = true;

            expect(() => {
                ScriptLoader.load({
                    src: 'https://www.google-analytics.com/analytics.js',
                    onSuccess: () => {
                        done();
                    },
                    onError: () => {
                        done();
                    },
                });
            }).to.throw(Error);

            global.__SERVER__ = isServerSide;
            done();
        });
    });
});
