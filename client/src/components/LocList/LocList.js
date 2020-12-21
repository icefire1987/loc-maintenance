import React from 'react';
import PropTypes from 'prop-types';

import {
    Button,
    Grid,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tooltip,
    Typography,
} from '@material-ui/core';
import ErrorIcon from '@material-ui/icons/Error';
import SendIcon from '@material-ui/icons/Send';

import './LocList.scss';

const LocList = (props) => {
    const { locs, notifyMaintenance } = props;
    const handleNotification = (loc) => {
        notifyMaintenance({ loc });
    };

    return (
        <Paper>
            <Grid container>
                <Grid item xs={12}>
                    <Typography variant="h4" paragraph>Übersicht</Typography>
                </Grid>
                <Grid item xs={12}>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableCell align="center">Bezeichnung</TableCell>
                                <TableCell align="center">Laufleistung in km</TableCell>
                                <TableCell align="center">Betriebstage</TableCell>
                                <TableCell align="center">Wartung in km/Tagen</TableCell>
                                <TableCell align="center">Aktion</TableCell>
                            </TableHead>
                            <TableBody>
                                {locs.length > 0 && locs.map((loc) => (
                                    <TableRow
                                        key={loc.id}
                                        className={[
                                            loc.needMaintenance ? 'Loclist-Warning' : '',
                                            loc.daysTillInput < 0 ? 'Loclist-Datacare' : ''
                                        ].join(' ')}
                                    >
                                        <TableCell align="left">
                                            { loc.daysTillInput < 0 && (
                                                <Tooltip title="Datenpflege notwendig!" className="Loclist-Icon">
                                                    <ErrorIcon />
                                                </Tooltip>
                                            )}
                                            {loc.name}
                                        </TableCell>
                                        <TableCell align="right">{loc.mileage}</TableCell>
                                        <TableCell align="right">{loc.duration}</TableCell>
                                        <TableCell align="right">
                                            {loc.mileageToMaintenance}
                                            /
                                            {loc.durationToMaintenance}
                                        </TableCell>

                                        <TableCell align="center">
                                            {loc.needMaintenance && (
                                                <Button
                                                    variant="contained"
                                                    color="secondary"
                                                    size="large"
                                                    startIcon={<SendIcon />}
                                                    style={{ verticalAlign: 'center' }}
                                                    onClick={
                                                        () => handleNotification(loc)
                                                    }
                                                >
                                                    Mitarbeiter informieren
                                                </Button>

                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default LocList;

LocList.propTypes = {
    locs: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    notifyMaintenance: PropTypes.func.isRequired
};
