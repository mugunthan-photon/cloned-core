/**
 * Timer Helper is used to get the Remaining time and Formatted Time etc
 * UTC based time diff will be added based on the requirement.
 *
 * A Timer helper is available to calcualate the remaining Time, Logic is separated
 * so if remaining Time is <= 0 you can display a different component as required
 *
 */


class TimerHelper {

    /**
     * @param endtime {DATE} is taken to find difference
     * @param starttime {DATE} is taken to find the difference optional
     * if not passed then will take it from latest value.
     */
    static getTimeRemaining(endtime, starttime = new Date()) {
        const t = Date.parse(endtime) - Date.parse(starttime);

        if (t < 0) {
            return {
                total: -1,
                days: 0,
                hours: 0,
                minutes: 0,
                seconds: 0,
            };
        }
        const seconds = Math.floor((t / 1000) % 60);
        const minutes = Math.floor((t / 1000 / 60) % 60);
        const hours = Math.floor((t / (1000 * 60 * 60)) % 24);
        const days = Math.floor(t / (1000 * 60 * 60 * 24));
        return {
            total: t,
            days,
            hours,
            minutes,
            seconds,
        };
    }

    /**
     * @param milliseconds {NUMBER} remaining milliseconds
     * @returns {OBJECT} with hours, minutes, and seconds
     */
    static getFormattedTime(milliseconds) {
        let seconds = Math.floor((milliseconds / 1000) % 60);
        let minutes = Math.floor((milliseconds / 1000 / 60) % 60);
        let hours = Math.floor((milliseconds / (1000 * 60 * 60)) % 24);

        seconds = seconds < 10 ? `0${seconds}` : seconds;
        minutes = minutes < 10 ? `0${minutes}` : minutes;
        hours = hours < 10 ? `0${hours}` : hours;

        return {
            hours,
            minutes,
            seconds,
        };
    }

    static getDigitSplit(number) {
        return number.toString().split('').map(Number);
    }

}

export default TimerHelper;
