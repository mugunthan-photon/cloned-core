/**
 * NavigationHelper helps in Navigating between Pages
 * Using window object, Utility function.
 */

class NavigationHelper {

    /**
     * navigate helps you to navigate in the same tab / new tab
     * @param navigationLink - Link to redireect to
     * @param openLinkInNewTab - defaults to false, if passed opens in new tab
     */
    static navigate(navigationLink, openLinkInNewTab = false) {
        openLinkInNewTab ? window.open(navigationLink, '_blank') : window.location.href = navigationLink;
    }

}

export default NavigationHelper;
