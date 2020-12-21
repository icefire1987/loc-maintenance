import { Router } from 'express';

class LocController {
    constructor(props) {
        const {
            locRepository,
            locService
        } = props;

        this.router = new Router();

        this.locService = locService;
        this.locRepository = locRepository;

        this.router.post('/reset', async (req, res) => this.resetLoc(req, res));
        this.router.post('/update', async (req, res) => this.updateLoc(req, res));
        this.router.get('/', async (req, res) => this.getLocs(req, res));
    }

    async getLocs(req, res) {
        try {
            const locs = await this.locRepository.fetchAll();
            const locData = locs.map((loc) => {
                const daysTillInput = this.locService.calcDaysTillInput(loc);
                loc.setDaysTillInput(daysTillInput);
                return loc;
            });
            return res.json(locData);
        } catch (error) {
            console.error('Something went wrong', error);
            return res.status(500).json({ Error: error });
        }
    }

    async updateLoc(req, res) {
        try {
            const { id, mileage, duration } = req.body;
            const loc = await this.locRepository.fetch(id);
            loc.setLastInput(new Date());

            loc.addMileage(mileage);
            loc.addDuration(duration);

            if (this.locService.isMaintenanceNeeded(loc)) {
                loc.setMaintenance();
            }

            const updatedRepo = await this.locRepository.persist(loc);
            return res.status(200).json(updatedRepo);
        } catch (error) {
            console.error('Something went wrong', error);
            return res.status(500).json({ Error: error });
        }
    }

    async resetLoc(req, res) {
        try {
            const { id } = req.body;
            const loc = await this.locRepository.fetch(id);
            loc.reset();
            const status = await this.locRepository.persist(loc);
            return res.status(200).json(status);
        } catch (error) {
            console.error('Something went wrong', error);
            return res.status(500).json({ Error: error });
        }
    }
}

export default LocController;
