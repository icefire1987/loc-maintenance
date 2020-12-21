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
}
