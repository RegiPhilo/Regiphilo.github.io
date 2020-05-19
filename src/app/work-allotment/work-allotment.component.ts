import { Component, OnInit, ViewChild } from '@angular/core';
import { StaffEntryModel } from 'Model/staff-entry-model';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { WorkAlotInit } from 'Model/work-alot-init';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import { WorkAllotModel } from 'Model/work-allot-model';
import { NgbDate, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AgGridAngular } from 'ag-grid-angular';
import { ExcelService } from '../excel.service';

@Component({
  selector: 'app-work-allotment',
  templateUrl: './work-allotment.component.html',
  styleUrls: ['./work-allotment.component.css']
})
export class WorkAllotmentComponent implements OnInit {
 
 
  data:WorkAllotModel;
  saveResult:any
  entryData:any;
  selectedData:any;
  editData:any
  confirmDelete:boolean;
  wrkAltInt:any;

  @ViewChild('agGrid') agGrid: AgGridAngular;

  constructor(public apiService:ApiService,
    public router:Router,private excelService:ExcelService) { 
    this.data=new WorkAllotModel();
    this.selectedData=new WorkAllotModel();
    this.confirmDelete=false;
    
  }
  
  columnDefs = [
    {headerName: 'Id', field: 'id', sortable: true, filter: true,checkboxSelection: true},
    {headerName: 'Alloted Date', field: 'crDateString', sortable: true, filter: true},
    {headerName: 'Staff Name', field: 'staffName', sortable: true, filter: true},
    {headerName: 'Subject', field: 'subject', sortable: true, filter: true},
    {headerName: 'Standard', field: 'standard', sortable: true, filter: true},
    {headerName: 'Alloted Task', field: 'taskAlloted', sortable: true, filter: true},
    {headerName: 'Expected Date', field: 'expDateString', sortable: true, filter: true},
    {headerName: 'Task Status', field: 'taskStatus', sortable: true, filter: true},
    {headerName: 'Actual Completed Date', field: 'actCompDateString', sortable: true, filter: true},
    {headerName: 'Payment Status', field: 'pymtStatus', sortable: true, filter: true},
    {headerName: 'Amount', field: 'amount', sortable: true, filter: true},
    {headerName: 'Remarks', field: 'remarks', sortable: true, filter: true}
];

  ngOnInit(): void {
    this.fetchEntries();
    this.fetchDistinctStaffEntries();
    this.clearWorkAllotment();
   
  }

  saveWorkAllotment(){

    this.saveResult="";
    this.data.crDate=this.data.crDateString;
    this.data.expDate=this.data.expDateString;
    this.data.actCompDate=this.data.actCompDateString;

    console.log(this.data.standard);
         
     this.apiService.saveWorkAlot(this.data).subscribe((response) => {
        console.log(response);
        this.saveResult=response;
      });
      this.clearWorkAllotment();
      
      alert("Success! Entry Saved");
      this.fetchEntries();
  }

  fetchEntries(){
    this.entryData="";     
    this.apiService.fetchAllWorkAltmnts().subscribe((response) => {
      this.entryData=response;  
      console.log(this.entryData);           
    });

    
  }

  fetchDistinctStaffEntries(){
    this.wrkAltInt="";     
    this.apiService.fetchDistinctStaffEntries().subscribe((response) => {
      this.wrkAltInt=response;       
    });
  }

  clearWorkAllotment(){
    this.data=new WorkAllotModel();    
    this.data.action="Save"; 
    this.data.pymtStatus="Nil Paid" ;  
    
  }
  onSelectEdit(selectedData){
    selectedData.action="Edit";
    this.data=selectedData;
      console.log(selectedData);
  }
  onSelectDelete(){
    this.saveResult="";
     
      this.apiService.deleteWorkAlot(this.data.id).subscribe(
        ()=>console.log(`Entry with id =${this.data.id} deleted`),
        (err)=>console.log(err)
      );
      
      alert("Success! Entry Deleted");
      this.confirmDelete=false;
      this.clearWorkAllotment();
      this.fetchEntries();
  }

  getSelectedRows() {
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    const selectedData = selectedNodes.map( node => node.data );
     selectedData.map( node => this.data=node);
     if(this.data.id>0){
     this.data.action="Edit";}
    console.log("In sel Row"+this.data);
}

getFilteredRows() {
 // const selectedNodes = this.agGrid.api.
 // console.log(selectedNodes.);
}

exportAsXLSX():void {
  
  this.excelService.exportAsExcelFile(this.entryData, 'WorkAllotment');
}

}
