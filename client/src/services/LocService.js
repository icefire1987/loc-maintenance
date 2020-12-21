import Loc from '../models/Loc';

export default class LocService {
    constructor(props) {
        this.endpoint = props.endpoint;
    }

    async update(data) {
        const url = `${this.endpoint}/loc/update`;
        const res = await fetch(url, {
            method: 'POST',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        await res.json();
        if (res.status === 200) {
            return true;
        }
        return false;
    }

    async get() {
        const url = `${this.endpoint}/loc/`;
        const res = await fetch(url);
        if (res.status === 200) {
            const locs = await res.json();
            return locs.map((loc) => new Loc(loc));
        }
        return [];
    }

    async notifyServiceTeam(loc) {
        const url = `${this.endpoint}/loc/reset`;
        const res = await fetch(url, {
            method: 'POST',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loc)
        });
        console.log('Loc needs maintenance!', JSON.stringify(loc));
        if (res.status === 200) {
            return true;
        }
        return false;
    }
}
