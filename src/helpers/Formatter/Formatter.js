const formatPhoneNumber = (phoneNumber) => {
    let formattedPhoneNumber = phoneNumber;
    if (phoneNumber) {
        const sanitisedPhoneNumber = phoneNumber.toString().replace(/\D/g, '');
        const phoneNumberMatches = sanitisedPhoneNumber.match(/^(\d{3})(\d{3})(\d{4})$/);

        if (phoneNumberMatches) {
            formattedPhoneNumber = `(${phoneNumberMatches[1]}) ${phoneNumberMatches[2]}-${phoneNumberMatches[3]}`;
        }
    }

    return formattedPhoneNumber;
};

/**
 * Take URL and reformats the URL after getting rid of the hostname
 * E.g. https://www.jcpenney.com/g/bed-and-bath/N-bwo3w?pageType=X2H2
 * returns /g/bed-and-bath/N-bwo3w?pageType=X2H2
 * @param {*} url
 */
const formatUrlAsRelative = (url) => {
    let formattedUrl = url;
    if (url) {
        const REGEX = /^[^#]*?:\/\/.*?(\/.*)$/;
        const matches = url.match(REGEX);
        if (matches && matches[1]) {
            formattedUrl = matches[1];
        }
    }
    return formattedUrl;
};

const formatOrderNumber = (orderNumber) => {
    let formattedOrderNumber = orderNumber;
    if (orderNumber) {
        formattedOrderNumber = orderNumber.replace(/.{1,4}/g, value => (`${value} `)).trim();
    }

    return formattedOrderNumber;
};

class Formatter {

    static TYPE = {
        PHONE: 0,
        AS_RELATIVE_URL: 1,
        ORDER_NUMBER: 2,
    }

    static format(value, type) {
        switch (type) {
            case Formatter.TYPE.PHONE:
                return formatPhoneNumber(value);
            case Formatter.TYPE.AS_RELATIVE_URL:
                return formatUrlAsRelative(value);
            case Formatter.TYPE.ORDER_NUMBER:
                return formatOrderNumber(value);
            default:
                return value;
        }
    }
}

export default Formatter;
