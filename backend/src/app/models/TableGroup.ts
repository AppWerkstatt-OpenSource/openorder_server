import { Table } from './table';

export class TableGroup {
    name : string;
    id: number;
    tables = [];

    public addTable(table: Table) {
        this.tables.push(table);
    }
}