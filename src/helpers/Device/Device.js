class Device {

    static TYPE = {
        ANDROID: 'ANDROID',
        iOS: 'iOS',
        WINDOWS: 'WINDOWS',
        OPERA: 'OPERA',
        UNKNOWN: 'UNKNOWN',
    }

    /**
     * Looks for the useragent and returns the corresponding device
     */
    static findDeviceType() {
        let deviceType;
        if (navigator.userAgent.match(/Android/i)) {
            deviceType = Device.TYPE.ANDROID;
        } else if (navigator.userAgent.match(/(iPad|iPhone)/g)) {
            deviceType = Device.TYPE.iOS;
        } else if (navigator.userAgent.match(/Opera Mini/i)) {
            deviceType = Device.TYPE.OPERA;
        } else if (navigator.userAgent.match(/Windows Phone/i)) {
            deviceType = Device.TYPE.WINDOWS;
        } else {
            deviceType = Device.TYPE.UNKNOWN;
        }
        return deviceType;
    }
}

export default Device;
