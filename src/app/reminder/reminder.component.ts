import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../api.service';
import { AgGridAngular } from 'ag-grid-angular';

@Component({
  selector: 'app-reminder',
  templateUrl: './reminder.component.html',
  styleUrls: ['./reminder.component.css']
})
export class ReminderComponent implements OnInit {
  entryData:any;
  @ViewChild('agGrid') agGrid: AgGridAngular;
  
  columnDefs = [
    {headerName: 'Id', field: 'id', sortable: true, filter: true,checkboxSelection: true},
    {headerName: 'StaffName', field: 'staffName', sortable: true, filter: true},
    {headerName: 'Subject', field: 'subject', sortable: true, filter: true}
];
  constructor(public apiService:ApiService) { }

  ngOnInit(): void {
    this.fetchEntries();
  }

  fetchEntries(){
    this.entryData="";
     
    this.apiService.fetchEntries().subscribe((response) => {
      this.entryData=response;  
      console.log(this.entryData);   
    });
  }

  getSelectedRows() {
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    const selectedData = selectedNodes.map( node => node.data );
    const selectedDataStringPresentation = selectedData.map( node => node.staffName + ' ' + node.subject).join(', ');
    alert(`Selected nodes: ${selectedDataStringPresentation}`);
}

}
