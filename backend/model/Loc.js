export default class Loc {
    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.mileage = data.mileage;
        this.duration = data.duration;
        this.needMaintenance = data.needMaintenance || false;
        this.durationToMaintenance = data.durationToMaintenance;
        this.mileageToMaintenance = data.mileageToMaintenance;
        this.lastInput = data.lastInput;
        this.daysTillInput = data.daysTillInput;
    }

    addMileage(mileage) {
        this.mileage += parseInt(mileage, 10);
    }

    addDuration(duration) {
        this.duration += parseInt(duration, 10);
    }

    setDurationToMaintenance(value) {
        this.durationToMaintenance = parseInt(value, 10);
    }

    setMileageToMaintenance(value) {
        this.mileageToMaintenance = parseInt(value, 10);
    }

    setLastInput(value) {
        this.lastInput = new Date(value);
    }
    setDaysTillInput(value) {
        this.daysTillInput = parseInt(value, 10);
    }

    setMaintenance() {
        this.needMaintenance = true;
    }

    reset() {
        this.duration = 0;
        this.mileage = 0;
        this.needMaintenance = false;
    }
}
