import { promises as fs } from 'fs';
import Loc from '../model/Loc';

class LocRepository {
    constructor() {
        this.locs = [];
    }

    async fetchAll() {
        const storageRawData = await fs.readFile('db.json', 'utf-8');
        if (!storageRawData) {
            return [];
        }
        const storageData = JSON.parse(storageRawData);
        this.locs = storageData.map((loc) => new Loc(loc));
        return this.locs;
    }

    async fetch(id) {
        const storageRawData = await fs.readFile('db.json', 'utf-8');
        if (!storageRawData) {
            return [];
        }
        const storageData = JSON.parse(storageRawData);
        const loc = storageData.find((item) => item.id === id);
        return new Loc(loc);
    }

    async persist(loc) {
        if (!loc) {
            return [];
        }
        await this.fetchAll();
        const objIndex = this.locs.findIndex(((obj) => obj.id === loc.id));
        this.locs[objIndex] = loc;
        const data = JSON.stringify(this.locs);
        await fs.writeFile('db.json', data);
        return true;
    }
}

export default LocRepository;
