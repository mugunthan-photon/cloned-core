export default class Cookies {
    /**
     * Takes the name as parameters
     * Returns if it exists,
     * else returns undefined
     */
    static load(name) {
        /**
         * Condition for the server side rendering
         */
        let documentCookie;
        /* istanbul ignore next */
        if (typeof document === 'undefined') {
            return documentCookie;
        }
        documentCookie = document.cookie;
        if (documentCookie.length > 0) {
            const cookieName = (`${name}=`);
            const cookiesArray = document.cookie.split(';');
            for (let i = 0; i < cookiesArray.length; i += 1) {
                let cookie = decodeURIComponent(cookiesArray[i]);
                while (cookie.charAt(0) === ' ') {
                    cookie = cookie.substring(1);
                }
                if (cookie.indexOf(cookieName) === 0) {
                    return cookie.substring(cookieName.length, cookie.length);
                }
            }
        }
        return undefined;
    }

    /**
     * CreateCookie functions takes the name for the cookie and the value
     * and the expiry date
     * and sets the cookie
     */
    static save(name, value, days, domain = '.jcpenney.com') {
        /**
         * Condition for the server side rendering
         */
        if (__SERVER__) {
            return;
        }
        let expires;
        const date = new Date();
        if (days) {
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = (`; expires=${date.toGMTString()}`);
        } else {
            expires = '';
        }
        document.cookie = (`${name}=${value}${expires};domain=${domain};path=/`);
    }

    /**
     * Remove a cookie given a name
     */
    static remove(name, domain = '.jcpenney.com') {
        /**
         * Condition for the server side rendering
         */
        if (__SERVER__) {
            return;
        }

        if (!name) {
            return;
        }
        const expires = `=;expires=Thu, 01 Jan 1970 00:00:01 GMT;domain=${domain};path=/`;
        document.cookie = name + expires;
    }
}
