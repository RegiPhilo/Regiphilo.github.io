import { Component, OnInit, ViewChild } from '@angular/core';
import { StaffEntryModel } from 'Model/staff-entry-model';
import {ApiService} from '../api.service';
import { Router } from '@angular/router';
import { AgGridAngular } from 'ag-grid-angular';
import { ExcelService } from '../excel.service';

@Component({
  selector: 'app-staff-entry',
  templateUrl: './staff-entry.component.html',
  styleUrls: ['./staff-entry.component.css']
})
export class StaffEntryComponent implements OnInit {

  std:any;
  data:StaffEntryModel;
  saveResult:any
  entryData:any;
  selectedData:any;
  editData:any
  confirmDelete:boolean;
  staffCnt:number;
  exportData:any;
  
  @ViewChild('agGrid') agGrid: AgGridAngular;
  
  columnDefs = [
    {headerName: 'StaffId', field: 'staffId', sortable: true, filter: true,checkboxSelection: true,width: 100,minWidth: 50,maxWidth: 150,resizable:true},
    {headerName: 'StaffName', field: 'staffName', sortable: true, filter: true,width: 120,minWidth: 50,maxWidth: 150,resizable:true},
    {headerName: 'Standard', field: 'standard', sortable: true, filter: true,width: 110,minWidth: 50,maxWidth: 150,resizable:true},
    {headerName: 'Subject', field: 'subject', sortable: true, filter: true,width: 110,minWidth: 50,maxWidth: 150,resizable:true},
    {headerName: 'Occupation', field: 'occupation', sortable: true, filter: true,width: 140,minWidth: 50,maxWidth: 150,resizable:true},
    {headerName: 'Phone Number', field: 'phoneNo', sortable: true, filter: true,width: 150,minWidth: 50,maxWidth: 150,resizable:true},
    {headerName: 'Address', field: 'address', sortable: true, filter: true,width: 120,minWidth: 50,maxWidth: 300,resizable:true},
    {headerName: 'Can be used for', field: 'canbeUsedFor', sortable: true, filter: true,width: 170,minWidth: 50,maxWidth: 300,resizable:true},
    {headerName: 'Remarks', field: 'remarks', sortable: true, filter: true,width: 120,minWidth: 50,maxWidth: 500,resizable:true}
];

  constructor(public apiService:ApiService,
    public router:Router,private excelService:ExcelService) {
    this.std=['1','2','3','4','5','6','7','8','9','10','11','12','G'];
    this.data=new StaffEntryModel();
    this.selectedData=new StaffEntryModel();
    this.confirmDelete=false;
   }

  ngOnInit(): void {
    this.fetchEntries();
    this.data.action="Save";
    this.staffCnt=0;
  }

  
  makeStaffEntry(){
    
      this.apiService.makeStaffEntry(this.data).subscribe((response) => {
        console.log(response);
        this.saveResult=response;
      });
      this.clearStaffEntry();      
      alert("Success! Entry Saved");
      this.fetchEntries();
      
  }

  fetchEntries(){
    this.entryData="";
     
    this.apiService.fetchEntries().subscribe((response) => {
      this.entryData=response;  
      console.log(this.entryData);   
    });
  }

  clearStaffEntry(){
    this.data=new StaffEntryModel();
    this.data.action="Save";
  }
  onSelectEdit(selectedData){
    selectedData.action="Edit";
    this.data=selectedData;
    console.log(selectedData);
  }
  onSelectDelete(){
    this.saveResult="";
     
      this.apiService.deleteEntry(this.data.id).subscribe(
        ()=>console.log(`Entry with id =${this.data.id} deleted`),
        (err)=>console.log(err)
      );
     
      alert("Success! Entry Deleted");
      this.confirmDelete=false;
      this.clearStaffEntry();
      this.fetchEntries();
      this.getStaffCnt();
  }

  getSelectedRows() {
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    const selectedData = selectedNodes.map( node => node.data );
     selectedData.map( node => this.data=node);
     if(this.data.staffId>0){
     this.data.action="Edit";}
    console.log("In sel Row"+this.data);
}

onFilterChanged(event) {  
  this.staffCnt=0;    
  this.staffCnt=this.agGrid.api.getDisplayedRowCount();   
  }
  
  getStaffCnt(){
    this.staffCnt=0;   
    this.staffCnt=this.agGrid.api.getDisplayedRowCount();  
  }
  
  
  exportAsXLSX():void {
      this.excelService.exportAsExcelFile(this.entryData, 'StaffEntry');
  }
  
  
  clearFilter(){
    this.agGrid.api.setFilterModel(null);
  }
}
