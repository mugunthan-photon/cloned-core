import FontFaceObserver from 'fontfaceobserver';
import classNames from 'classnames';

class FontLoader {

    callToLoadFonts(fontList, styles) {
        this.styles = styles;
        this.cx = classNames.bind(this.styles);

        this.fontList = (fontList instanceof Array) ? fontList : [];
        if (this.fontList.length <= 0) {
            return;
        }
        // console.log('FONT FLAG:::::::');
        this.loadFont();
    }

    /**
     * Load all the fonts through promisses asynchronously
     */
    loadFont = () => {
        const arrObj = [...this.fontList];
        const fontObservers = arrObj.map((fontObj) => {
            // console.log('MAP====>', fontObj.weight);
            const fontName = fontObj.fontname;
            const fontWeight = fontObj.weight;
            const fontStyle = fontObj.style;

            return new FontFaceObserver(fontName, {
                weight: fontWeight,
                style: fontStyle,
            });
        });
        const fontPromises = [];
        fontObservers.forEach((obj) => {
            const promiseObj = Promise.resolve(obj.load());
            // console.log('PROMIS::::', promiseObj);
            fontPromises.push(promiseObj);
        });
        /* Call on success func: fontLoaded on failure func:fontNotLoaded */
        Promise.all([...fontPromises]).then(this.fontLoaded.bind(this)).catch();
    }
    /**
     * Promise callback function on success
     */
    fontLoaded = () => {
        /* Set font loaded flag in localstorage */
        this.addFontLoadedToHTML();
    }
    /**
     * Add fonts-loaded class to HTML tag on successfuly loading the fonts
     */
    addFontLoadedToHTML = () => {
        const className = this.cx(this.styles.fontsLoaded);
        if (!document.documentElement.classList.contains(className)) {
            document.documentElement.className = className;
        }
    }

}
export default FontLoader;
