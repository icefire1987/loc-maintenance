import 'dotenv/config';
import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import bodyParser from 'body-parser';

import LocController from "./controller/LocController";
import LocService from "./service/LocService.js";
import LocRepository from "./repository/LocRepository";

const app = express();
app.use(morgan('tiny', {
    skip: (req, res) => !(DEVELOPMENT_MODE || res.statusCode >= 400)
}));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const {
    DEVELOPMENT_MODE,
    PORT,
    CONFIG_TRESHOLD_MILEAGE,
    CONFIG_TRESHOLD_DURATION_DAYS,
    CONFIG_TRESHOLD_INPUT_DAYS,
} = process.env;

const locRepository = new LocRepository();
const locService = new LocService({
    limits: {
        tresholdDurationDays:CONFIG_TRESHOLD_DURATION_DAYS || 100,
        tresholdMileage:CONFIG_TRESHOLD_MILEAGE || 150, 
        tresholdInputDays:CONFIG_TRESHOLD_INPUT_DAYS || 14
    }
});
const locController = new LocController({ locRepository, locService });


app.use('/loc/', locController.router);
app.get('/', (req, res) => res.send('Hola !'));

if (DEVELOPMENT_MODE) {
    app.listen(PORT, () => {
        console.log(`Backend is listening on port ${PORT || 'NONE'}`);
    });
}

export default app;
