import { Component } from '@angular/core';
import { Table } from '../models/Table';
import { TableGroup } from '../models/TableGroup'

import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.tische.html',
  styleUrls: ['./app.tische.css']
})
export class Tische {
  showTableGroupEditor = false;
  showTableEditor = false;
  tableGroups = [];
  tableGroup: TableGroup = new TableGroup();
  table = {};

    constructor(private http: HttpClient) {
      this.loadTableGroups();
  }

  // TableGroup
  public cmdAddTableGroup(){
    var newTableGroup = new TableGroup();
    this.tableGroups.push(newTableGroup);
    this.tableGroup = newTableGroup;

    //show editor
    this.hideEditors();
    this.showTableGroupEditor = true;
  }

  public showTableGroup(event, tableGroup) {
    this.tableGroup = tableGroup;

    //show TableGroupEditor
    this.hideEditors();
    this.showTableGroupEditor = true;
  }

    // Table
  public cmdAddTable(event, tableGroup){
    var newTable = new Table();
    this.tableGroup = tableGroup;
    this.tableGroup.addTable(newTable);
    this.table = newTable;

    //show TableEditor
    this.hideEditors();
    this.showTableEditor = true;
  }

  private showTable(event, tableGroup, table){
    this.tableGroup = tableGroup;
    this.table = table;

    //show editor
    this.hideEditors();
    this.showTableEditor = true;
  }

  //hide all editors
  public hideEditors(){
    this.showTableGroupEditor = false;
    this.showTableEditor = false;
  }

  public cmdFinishTableGroup(event, tableGroup){
    this.showTableGroupEditor = false;
    //existing tableGroup?
    for(var i = 0; i < this.tableGroups.length; i++){
        if(tableGroup == this.tableGroups[i]){
            this.changeExistingTableGroup(tableGroup);
            break;
        }
    }
      this.addTableGroupToServer(tableGroup);
  }

  public cmdDeleteTableGroup(event, tableGroup){
    var index = this.tableGroups.indexOf(tableGroup);
    if (index > -1){
      this.tableGroups.splice(index, 1);
      this.deleteTableGroupFromServer(tableGroup);
    }
    this.hideEditors();
  }

  public cmdFinishTable(event, tableGroup, table){
    this.showTableEditor = false;

    //existing table?
    for(var i = 0; i < tableGroup.tables.length; i++){
      if(table == tableGroup.tables[i]){
        this.changeExistingTable(tableGroup, table);
        break;
      }
    }
    this.addTableToServer(tableGroup,table);
  }

  public cmdDeleteTable(event, tableGroup, table){
    var index = this.tableGroup.tables.indexOf(table);
    if (index > -1){
      this.tableGroup.tables.splice(index, 1);
      this.deleteTableFromServer(tableGroup, table);
      
    }
    this.hideEditors();
  }

    private loadTableGroups() {
    this.http.get('http://localhost:3000/api/TableGroups').subscribe(data => {
        // Read the result field from the JSON response.
        setTimeout(() => {
        let tableGroups = data as [any]
        for(var i = 0; i < tableGroups.length; i++) {
          let tableGroup = tableGroups[i];
          // umwandeln
          console.log(tableGroup);
          var newTableGroup = new TableGroup();
          newTableGroup.name = tableGroup.name;
          newTableGroup.id = tableGroup.id;
          // push to array
          this.tableGroups.push(newTableGroup);
          
          //load Table
          this.loadTables(newTableGroup);
        }
      });
    });
  }

    private loadTables(tableGroup: TableGroup) {
  
      this.http.get('http://localhost:3000/api/TableGroups/' + tableGroup.id + '/tables').subscribe(data => {
        setTimeout(() => {
        let tables = data as [any]
        for(var i = 0; i < tables.length; i++) {
          let table = tables[i];
          // umwandeln
          console.log(table);
          var newTable = new Table();
          newTable.name = table.name;
          newTable.id = table.id;
          console.log(newTable);
          // push to array
          tableGroup.addTable(newTable);
        }
      });
    });
  }

  //Server Tablegroup
  addTableGroupToServer(tableGroup: TableGroup) {
    this.http.post('http://localhost:3000/api/TableGroups',tableGroup).subscribe();
  }

  deleteTableGroupFromServer(tableGroup: TableGroup){
    this.http.delete('http://localhost:3000/api/TableGroups/'+tableGroup.id).subscribe();
  }

  changeExistingTableGroup(tableGroup: TableGroup){
    this.http.put('http://localhost:3000/api/TableGroups/'+tableGroup.id, tableGroup).subscribe();
  }

  //Server Tables
    addTableToServer(tableGroup: TableGroup, table: Table){
    this.http.post('http://localhost:3000/api/TableGroups/'+tableGroup.id+'/tables',table).subscribe();
  }

  changeExistingTable(tableGroup: TableGroup, table: Table){
    this.http.put('http://localhost:3000/api/TableGroups/'+tableGroup.id+'/tables/'+table.id, table).subscribe();
  }

  deleteTableFromServer(tableGroup: TableGroup, table: Table){
    this.http.delete('http://localhost:3000/api/TableGroups/'+tableGroup.id+'/tables/'+table.id).subscribe();
  }
}
