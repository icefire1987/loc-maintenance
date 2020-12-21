import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Header from './components/Header/Header';
import DataInput from './components/DataInput/DataInput';
import LocList from './components/LocList/LocList';

import LocService from './services/LocService';

const {
    REACT_APP_API_ENDPOINT
} = process.env;

class App extends Component {
    constructor(props) {
        super(props);
        this.locService = new LocService({ endpoint: REACT_APP_API_ENDPOINT });
        this.state = {
            locs: []
        };
    }

    async getLocs() {
        const locs = await this.locService.get();
        this.setState({ locs });
    }

    async handleSubmit(params) {
        const {
            id,
            mileage,
            duration
        } = params;

        await this.locService.update({
            id,
            mileage,
            duration
        });
        await this.getLocs();
    }

    async notifyServiceTeam(params) {
        const {
            loc
        } = params;

        await this.locService.notifyServiceTeam(loc);
        await this.getLocs();
    }

    async componentDidMount() {
        await this.getLocs();
    }

    render() {
        const { locs } = this.state;
        return (
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Header />
                </Grid>
                <Grid item xs={12}>
                    <DataInput locs={locs} callToUpdate={(params) => this.handleSubmit(params)} />
                </Grid>
                <Grid item xs={12}>
                    <LocList
                        locs={locs}
                        notifyMaintenance={(params) => this.notifyServiceTeam(params)}
                    />
                </Grid>

            </Grid>
        );
    }
}

export default App;
