import React, { useState } from 'react';
import PropTypes from 'prop-types';

import {
    Paper, Grid, Typography, FormControl, Select, MenuItem, InputLabel, TextField, Button
} from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';

import Loc from '../../models/Loc';

import './DataInput.scss';

const DataInput = (props) => {
    const { locs, callToUpdate } = props;

    const [selectedLoc, setSelectedLoc] = useState({});
    const [duration, setDuration] = useState(Math.floor(Math.random() * 100));
    const [mileage, setMileage] = useState('');

    const clearInput = () => {
        setMileage('');
        setSelectedLoc('');
        setDuration(Math.floor(Math.random() * 100));
    };

    const handleLocChange = (event) => {
        const aLoc = locs.filter((i) => i.id === event.target.value);
        setSelectedLoc(new Loc(aLoc[0]));
    };

    const handleMilageInput = (event) => {
        const inputData = event.target.value;
        setMileage(inputData);
    };
    const handleDurationInput = (event) => {
        const inputData = event.target.value;
        setDuration(inputData);
    };
    const handleSubmit = async () => {
        callToUpdate({
            id: selectedLoc.id,
            mileage,
            duration
        });
        clearInput();
    };

    const classes = {
        root: {
            '&$focused': {
                color: '#000',
            },
        },
        focused: {},
    };
    return (
        <Paper>
            <Grid container>
                <Grid container item xs={12}>
                    <Typography variant="h4" paragraph>Lokomotivdaten pflegen</Typography>
                </Grid>
                <Grid container item xs={12} alignItems="center">
                    <FormControl variant="filled" margin="normal" className="Input-locomotive">
                        <InputLabel id="labelLoc">Lokomotive wählen</InputLabel>
                        <Select
                            value={selectedLoc.id || ''}
                            onChange={handleLocChange}
                            labelId="labelLoc"
                        >
                            {
                                locs.map((loc) => (
                                    <MenuItem key={loc.id} value={loc.id}>{loc.name}</MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>
                    <FormControl margin="normal">
                        <TextField
                            classes={classes}
                            variant="filled"
                            label="Kilometer eingeben"
                            onChange={handleMilageInput}
                            value={mileage}
                        />
                    </FormControl>
                    <FormControl margin="normal">
                        <TextField
                            variant="filled"
                            label="sim. Betriebszeit in Tagen"
                            onChange={handleDurationInput}
                            value={duration}
                        />
                    </FormControl>
                    <FormControl margin="normal">
                        <Button
                            variant="contained"
                            color="default"
                            size="large"
                            startIcon={<SaveIcon />}
                            style={{ verticalAlign: 'center' }}
                            disabled={(mileage === '' || !selectedLoc.id)}
                            onClick={handleSubmit}
                        >
                            Speichern
                        </Button>
                    </FormControl>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default DataInput;

DataInput.propTypes = {
    callToUpdate: PropTypes.func.isRequired,
    locs: PropTypes.arrayOf(PropTypes.shape()).isRequired
};
