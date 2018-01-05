import sinon from 'sinon';
import NavigationHelper from './NavigationHelper';

describe('NavigationHelper', () => {
    it('Opens in the New Tab', () => {
        const stub = sinon.stub(window, 'open');
        stub('https://www.jcpenney.com', '_blank');
        NavigationHelper.navigate('https://www.jcpenney.com', true);
        stub.calledWith('https://www.jcpenney.com', '_blank');
        stub.restore();
    });

    it('Opens in the Same Tab', () => {
        NavigationHelper.navigate('https://www.jcpenney.com');
        // additional assertions will be added.
    });
});

