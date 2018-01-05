/*
 * Created by PoornachandraPulluru on 23/02/17.
 */
import extend from 'extend';
import { Cookies, LocalStorage } from '../index';

/**
 * util function to read URL params
 * @param {string} key - query parameter name
 * @param {http url} url (optional) - soruce of url to read params
 */
const getURLParameterBykey = (key, url = window.location.href) => { // TODO - this will moved to Util function later
    let name = key;
    name = name.replace(/[[\]]/g, '\\$&');
    const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`);
    const results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ''));
};

const getFormErrorDL = errorDetails => ({
    error: errorDetails,
});

const getNavigationDL = (payload) => {
    let navDL = null;
    const linkName = (payload.linkName || '').toLowerCase();
    if (payload.isReload) {
        Cookies.save('navigationClickDigitalData', linkName);
    } else {
        navDL = {
            page: {
                pageInfo: {
                    linkName,
                },
            },
        };
    }
    return navDL;
};

const getPendingNavigationDL = () => {
    const linkName = Cookies.load('navigationClickDigitalData');
    let navDL = null;
    if (linkName) {
        navDL = {
            page: {
                pageInfo: {
                    linkName,
                },
            },
        };
    }
    return navDL;
};

// To know the viewport size for page. values can be: small | medium | large | x-large
const getViewportSize = (window) => {
    let viewportSize = '';
    if (window && window.innerWidth) {
        const width = window.innerWidth;
        if (width < 600) {
            viewportSize = 'small';
        } else if (width >= 600 && width < 1024) {
            viewportSize = 'medium';
        } else if (width >= 1024 && width < 1440) {
            viewportSize = 'large';
        } else {
            viewportSize = 'x-large';
        }
    }
    return viewportSize;
};


const getDebugSource = () => {
    const debugSource = [];
    const yodaCOMobile = Cookies.load('yoda-checkout');
    const yodaCODesktop = Cookies.load('yoda-checkout-desktop');
    debugSource.push(`yoda-checkout=${yodaCOMobile || false}`);
    debugSource.push(`yoda-checkout-desktop=${yodaCODesktop || false}`);
    return debugSource;
};

const updateCommonDigitalData = (digitalData) => {
    const profileOptin = Cookies.load('omni_profileOptin');

    let emailOptIn = '';
    const mobileOptIn = [];
    if (profileOptin) {
        const emailOptInMapping = {
            Y: 'yes',
            NA: 'no selection',
            N: 'no',
        };
        Object.keys(emailOptInMapping).every((key) => {
            if (profileOptin.startsWith(key)) {
                emailOptIn = emailOptInMapping[key];
                return false;
            }
            return true;
        });

        if (profileOptin.split('|').length >= 2) {
            const mobileOptInData = profileOptin.split('|')[1];
            if (mobileOptInData.startsWith('NA')) {
                mobileOptIn.push('no selection');
            } else if (mobileOptInData.startsWith('N')) {
                mobileOptIn.push('no');
            } else {
                if (mobileOptInData.indexOf('P') !== -1) {
                    mobileOptIn.push('promotional');
                }
                if (mobileOptInData.indexOf('T') !== -1) {
                    mobileOptIn.push('transactional');
                }
            }
        }
    }

    const omniProfileType = Cookies.load('omni_profileType');
    const profileType = [];
    let rewardsFlag = 'no';
    let rewardsMemberType = '';
    if (omniProfileType) {
        const rewardsMemberTypeMapping = {
            'R-S': 'silver',
            'R-G': 'gold',
            'R-P': 'platinum',
            'R-R': 'red',
            'R-B': 'bronze',
        };
        Object.keys(rewardsMemberTypeMapping).every((key) => {
            if (omniProfileType.indexOf(key) !== -1) {
                rewardsMemberType = rewardsMemberTypeMapping[key];
                return false;
            }
            return true;
        });

        const profileTypeArray = omniProfileType.split('|');
        if (profileTypeArray.length >= 1 && profileTypeArray[0] === 'A') {
            profileType.push('active');
        }

        if (profileTypeArray.length >= 2 && profileTypeArray[1] === 'C') {
            profileType.push('credit');
        }

        if (profileTypeArray.length >= 4 && profileTypeArray[3] === 'L') {
            profileType.push('lapsed');
        }
    }
    if (LocalStorage.getData('DP_USER_STATE') === '1' && LocalStorage.getData('DP_REWARDS_TIER')) {
        rewardsMemberType = LocalStorage.getData('DP_REWARDS_TIER');
    } else if (LocalStorage.getData('DP_USER_STATE') === '1' && LocalStorage.getData('DP_REWARDS_STATUS') && LocalStorage.getData('DP_REWARDS_STATUS') === 'Pending') {
        rewardsMemberType = LocalStorage.getData('DP_REWARDS_STATUS');
    }

    let profileID = '';
    if (LocalStorage.getData('DP_USER_STATE') === '1') {
        if (rewardsMemberType) {
            profileType.push('rewards');
            rewardsFlag = 'yes';
        } else {
            rewardsFlag = 'no';
        }
        profileID = (Cookies.load('DYN_USER_ID') || LocalStorage.getData('ACCOUNT_ID') || '').toLowerCase();
    }

    const profileAttr = Cookies.load('omni_profileAttr') || '';
    // PriceZone: https://jira.jcpenney.com/browse/MNPDPYODA-2719?filter=25157
    const regionID = Cookies.load('UPZ') || 0;  // If no regionId found set it to zero

    const expressCheckoutValue = profileAttr.startsWith('Y') ? 'yes' : 'no';
    const expressCheckoutEnabled = (LocalStorage.getData('DP_USER_STATE') === '1') ? expressCheckoutValue : '';

    let associateFlag = '';
    const profileAttrArray = profileAttr.split('|');
    if (profileAttrArray.length >= 2) {
        associateFlag = profileAttrArray[1] === 'Y' ? 'yes' : 'no';
    }

    const ItemTotal = Cookies.load('ItemTotal');
    const commonDigitalData = {
        isReady: true,
        cart: {
            attributes: {
                cartTotal: (ItemTotal) ? ItemTotal.replace('$', '') : '0.00',
            },
        },
        error: [],
        dataVersion: 1,
        user: {// @TODO from where we can get this information.
            profile: {
                profileInfo: {
                    mobileOptIn,
                    // customerType: '', // not available in wiki
                    teaLeafID: Cookies.load('TLTSID') || '',
                    rewardsMemberType,
                    associateFlag,
                    customerState: LocalStorage.getData('DP_USER_STATE') === '1' ? 'logged-in' : 'guest',
                    rewardsFlag,
                    emailOptIn,
                    profileID,
                    profileType, // @TODO Need more details from tagging team
                    storeID: decodeURI(Cookies.load('userStoreInfo') || '').toLowerCase(),
                    itemsInSaveForLater: Cookies.load('DP_USER_FAVCOUNT') || '0',
                    visitorID: Cookies.load('cmvid') || LocalStorage.getData('DP_VISITOR_ID') || '',
                    expressCheckoutEnabled,
                    regionID: regionID.toString(),
                },
            },
        },
        page: {
            attributes: {
                internalCampaignID: getURLParameterBykey('cm_re') || '',
                debugSource: getDebugSource(),
            },
            pageInfo: {
                currency: (Cookies.load('shipToCurrencyCode') || 'USD').toLowerCase(), // @TODO - we have to read from cookie and set this value
                country: (Cookies.load('shipToCountry') || 'US').toLowerCase(), // @TODO - we have to read from cookie and set this value
                clusterInstance: Cookies.load('DPInstance') || '',
                pageViewport: getViewportSize(window),
            },
        },
    };
    if (!ItemTotal && Cookies.load('DP_ORDER_INFO')) {
        const cartTotal = Cookies.load('DP_ORDER_INFO').split('|'); // for desktop setting cartTotal value from DP_ORDER_INFO cookie
        commonDigitalData.cart.attributes.cartTotal = cartTotal[1].replace('$', '') || '0.00';
    }
    if (commonDigitalData.user.profile.profileInfo.storeID) {
        const storeId = commonDigitalData.user.profile.profileInfo.storeID.split('|')[0]; // for desktop setting cartTotal value from DP_ORDER_INFO cookie
        if (storeId === 'null') {
            commonDigitalData.user.profile.profileInfo.storeID = '';
        }
    }
    return extend(true, commonDigitalData, (digitalData || {}));
};

const selectStoreData = () => ({
    user: {
        profile: {
            profileInfo: {
                storeID: decodeURI(Cookies.load('userStoreInfo') || '').toLowerCase(),
            },
        },
    },
});

const storeSearchData = payload => ({
    store: {
        searchText: payload.address,
    },
});

const videoLoadedData = payload => ({
    video: payload.video,
    product: payload.product,
});

const openModelData = name => ({
    page: {
        pageInfo: {
            name,
        },
    },
});

class BaseActionFilter {
    constructor() {
        this.getURLParameterBykey = getURLParameterBykey; // TODO - once this function moved to yoda core util, we should removed from here also.
        this.getFormErrorDL = getFormErrorDL;
        this.getNavigationDL = getNavigationDL;
        this.getPendingNavigationDL = getPendingNavigationDL;
        this.updateCommonDigitalData = updateCommonDigitalData;
        this.selectStoreData = selectStoreData;
        this.storeSearchData = storeSearchData;
        this.videoLoadedData = videoLoadedData;
        this.openModelData = openModelData;
        this.getViewportSize = getViewportSize;
    }
}

export default BaseActionFilter;
