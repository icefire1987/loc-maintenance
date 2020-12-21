import moment from 'moment';

export default class LocService {
    constructor(props) {
        const { limits = {} } = props;
        const { tresholdDurationDays, tresholdMileage, tresholdInputDays } = limits;
        this.tresholdDuration = tresholdDurationDays;
        this.tresholdMileage = tresholdMileage;
        this.tresholdInput = tresholdInputDays;
    }

    isMaintenanceNeeded(loc) {
        const limitDuration = this.tresholdDuration - parseInt(loc.duration, 10);
        const limitMileage = this.tresholdMileage - parseInt(loc.mileage, 10);
        loc.setDurationToMaintenance(limitDuration);
        loc.setMileageToMaintenance(limitMileage);

        if (limitDuration < 0) {
            return true;
        }
        if (limitMileage < 0) {
            return true;
        }

        return false;
    }

    calcDaysTillInput(loc) {
        const lastInput = moment(loc.lastInput);
        const daysSinceInput = moment().diff(lastInput, 'days');
        const daysTillInput = this.tresholdInput - parseInt(daysSinceInput, 10);
        return daysTillInput;
    }
}
