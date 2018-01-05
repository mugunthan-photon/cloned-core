 import { expect } from 'chai';
 import Device from './Device';


 describe('Device check', () => {
     it('should detect andriod user agent', () => {
        navigator.__defineGetter__('userAgent', function() { // eslint-disable-line
            return 'Mozilla/5.0 (Linux; Android 6.0.1; SM-G920V Build/MMB29K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.98 Mobile Safari/537.36'; // customized user agent
        });

        // Mozilla/5.0(iPad; U; CPU iPhone OS 3_2 like Mac OS X; en-us) AppleWebKit/531.21.10 (KHTML, like Gecko) Version/4.0.4 Mobile/7B314 Safari/531.21.10gin_lib.cc
         const type = Device.findDeviceType();
         expect(type).equal(Device.TYPE.ANDROID);
     });

     it('should detect ipad user agent', () => {
        navigator.__defineGetter__('userAgent', function() { // eslint-disable-line
            return 'Mozilla/5.0(iPad; U; CPU iPhone OS 3_2 like Mac OS X; en-us) AppleWebKit/531.21.10 (KHTML, like Gecko) Version/4.0.4 Mobile/7B314 '; // customized user agent
        });

        // Safari/531.21.10gin_lib.cc
         const type = Device.findDeviceType();
         expect(type).equal(Device.TYPE.iOS);
     });

     it('should detect opera user agent', () => {
        navigator.__defineGetter__('userAgent', function() { // eslint-disable-line
            return 'Opera/9.80 (J2ME/MIDP; Opera Mini/9.80 (J2ME/22.478; U; en) Presto/2.5.25 Version/10.54'; // customized user agent
        });

        // Safari/531.21.10gin_lib.cc
         const type = Device.findDeviceType();
         expect(type).equal(Device.TYPE.OPERA);
     });

     it('should detect opera user agent', () => {
        navigator.__defineGetter__('userAgent', function() { // eslint-disable-line
            return 'some random user agent string'; // customized user agent
        });

        // Safari/531.21.10gin_lib.cc
         const type = Device.findDeviceType();
         expect(type).equal(Device.TYPE.UNKNOWN);
     });

     it('should detect windows user agent', () => {
        navigator.__defineGetter__('userAgent', function() { // eslint-disable-line
            return 'Mozilla/5.0 (compatible; MSIE 10.0; Windows Phone 8.0; Trident/6.0; IEMobile/10.0; ARM; Touch; NOKIA; Lumia 820)';
        });

        // Safari/531.21.10gin_lib.cc
         const type = Device.findDeviceType();
         expect(type).equal(Device.TYPE.WINDOWS);
     });

    //  it('Check fonts loaded and available', () => {
    //      const fontRenderer = new FontLoader();
    //      fontRenderer.loadFont = sinon.spy(fontRenderer.loadFont);
    //      fontRenderer.callToLoadFonts(fontListAvailable, {});
    //      expect(fontRenderer.loadFont.calledOnce).to.equal(true);
    //      fontRenderer.fontLoaded = sinon.spy(fontRenderer.fontLoaded);
    //      fontRenderer.fontLoaded();
    //      expect(fontRenderer.fontLoaded.callCount).equal(1);
    //  });
    //  it('Check the document classname is set', () => {
    //      const fontRenderer = new FontLoader();
    //      document.documentElement.className = 'test';
    //      const styles = { fontsLoaded: 'FontLoader-fontsLoaded-3T4av' };
    //      fontRenderer.callToLoadFonts(fontListAvailable, styles);
    //      fontRenderer.addFontLoadedToHTML();
    //      expect(document.documentElement.className).equal('FontLoader-fontsLoaded-3T4av');
    //  });
 });
