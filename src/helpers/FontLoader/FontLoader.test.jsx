 import { expect } from 'chai';
 import sinon from 'sinon';
 import FontLoader from './FontLoader';

 const fontListAvailable = [{ fontname: 'Montserrat', weight: '400', style: 'normal' },
                   { fontname: 'Montserrat', weight: '700', style: 'normal' },
                   { fontname: 'Open Sans', weight: '400', style: 'normal' },
                   { fontname: 'Open Sans', weight: '700', style: 'normal' },
                   { fontname: 'Open Sans', weight: '400', style: 'italic' }];

 describe('Fonts Loader Test Cases', () => {
     it('Check fonts with zero size array not passed', () => {
         const fontRenderer = new FontLoader();
         fontRenderer.callToLoadFonts({}, {});
         expect(fontRenderer.fontList.length).equal(0);
     });
     it('Check fonts loaded and available', () => {
         const fontRenderer = new FontLoader();
         fontRenderer.loadFont = sinon.spy(fontRenderer.loadFont);
         fontRenderer.callToLoadFonts(fontListAvailable, {});
         expect(fontRenderer.loadFont.calledOnce).to.equal(true);
         fontRenderer.fontLoaded = sinon.spy(fontRenderer.fontLoaded);
         fontRenderer.fontLoaded();
         expect(fontRenderer.fontLoaded.callCount).equal(1);
     });
     it('Check the document classname is set', () => {
         const fontRenderer = new FontLoader();
         document.documentElement.className = 'test';
         const styles = { fontsLoaded: 'FontLoader-fontsLoaded-3T4av' };
         fontRenderer.callToLoadFonts(fontListAvailable, styles);
         fontRenderer.addFontLoadedToHTML();
         expect(document.documentElement.className).equal('FontLoader-fontsLoaded-3T4av');
     });
 });
