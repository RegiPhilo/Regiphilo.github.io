import { Component, OnInit, ViewChild } from '@angular/core';
import { RemuModel } from 'Model/remu-model';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { AgGridAngular } from 'ag-grid-angular';
import { ExcelService } from '../excel.service';
import { WorkAllotModel } from 'Model/work-allot-model';



@Component({
  selector: 'app-remuneration',
  templateUrl: './remuneration.component.html',
  styleUrls: ['./remuneration.component.css']
})
export class RemunerationComponent implements OnInit {

  @ViewChild('agGrid') agGrid: AgGridAngular;
  
  data:RemuModel;
  saveResult:any
  entryData:any;
  selectedData:any;
  editData:any
  confirmDelete:boolean;
  staffSubList:any;
  sumAmt:number;
  workCodesRes:any;
  workCodes:any;
  stfNamechosen:boolean;
  selData:any[];

  
  public settings = {};
  public selectedItems = [];
  public workCodedata = [];


 
  columnDefs = [
    {headerName: 'Id', field: 'id', sortable: true, filter: true,checkboxSelection: true,width: 80,minWidth: 50,maxWidth: 150,resizable:true},
    {headerName: 'Payment Date', field: 'pymtDateString', sortable: true, filter: true,width: 150,minWidth: 50,maxWidth: 200,resizable:true},
    {headerName: 'Staff and Subject', field: 'staffSubj', sortable: true, filter: true,width: 180,minWidth: 50,maxWidth: 300,resizable:true},
    {headerName: 'Amount', field: 'amount', sortable: true, filter: true,width: 110,minWidth: 50,maxWidth: 150,resizable:true},
    {headerName: 'Payment Mode', field: 'pymtMode', sortable: true, filter: true,width: 150,minWidth: 50,maxWidth: 300,resizable:true},
    {headerName: 'Payment Status', field: 'pymtStatus', sortable: true, filter: true,width: 150,minWidth: 50,maxWidth: 300,resizable:true},
    {headerName: 'Work Codes', field: 'workAllotCodes', sortable: true, filter: true,width: 150,minWidth: 50,maxWidth: 300,resizable:true},
    {headerName: 'Remarks', field: 'remarks', sortable: true, filter: true,width: 120,minWidth: 50,maxWidth: 150,resizable:true}
];


  constructor(public apiService:ApiService,
    public router:Router,private excelService:ExcelService) { 
    this.data=new RemuModel();
    this.selectedData=new RemuModel();
    this.confirmDelete=false;
    this.data.action="Save";
  }
  ngOnInit(): void {
    this.fetchEntries();
    this.fetchDistinctStaffEntries();
    this.clearRemu();
    this.sumAmt=0;
    this.stfNamechosen=false;

    // setting and support i18n
   
   
  }

fetchWorkCodes(event){
  console.log("EventMethod");
  this.workCodesRes=""; 
  this.stfNamechosen=false;
  console.log("StaffSub in workCodeFetch"+this.data.staffSubj);
  var sfName=event.target.value;
  if(sfName!=null && sfName!=undefined && sfName.length>0){
    this.stfNamechosen=true;
  this.apiService.viewWorkCodes(event.target.value).subscribe((response) => {
     console.log(response);
     this.workCodesRes=response;      
     //this.allWorkCodes();
   });
   }
   
  }

  fetchEditWorkCodes(staffName:String){
    console.log("EditMethod");
  this.workCodesRes=""; 
  this.stfNamechosen=false;
  console.log("StaffSub in workCodeFetch"+staffName);
  if(staffName!=null && staffName!=undefined && staffName.length>0 && staffName!='undefined~undefined'){
   
    this.stfNamechosen=true;
      this.apiService.viewWorkCodes(staffName).subscribe((response) => {
     console.log(response);
     this.workCodesRes=response;  
    }); 
  }
     }

  
  saveRemu(){

    this.saveResult="";
      this.data.pymtDate=this.data.pymtDateString;
      console.log(this.data.workCodes)
    this.apiService.saveRemu(this.data).subscribe((response) => {
        console.log(response);
        this.saveResult=response;
      });
      this.clearRemu();
      
      alert("Success! Entry Saved");
      this.fetchEntries();
      this.stfNamechosen=false;
  }

  fetchEntries(){
    this.entryData="";     
    this.apiService.fetchAllRemunerations().subscribe((response) => {
      this.entryData=response;  
      console.log(this.entryData);           
    });

    
  }

  fetchDistinctStaffEntries(){
    this.staffSubList="";     
    this.apiService.fetchDistinctStaffSubEntries().subscribe((response) => {
      this.staffSubList=response;       
    });
  }

  clearRemu(){
    this.data=new RemuModel();    
    this.data.action="Save"; 
    //this.fetchEditWorkCodes(this.data.staffSubj); 
    this.stfNamechosen=false;  
    this.workCodesRes=""; 
    this.selData=null;

    
  }
  onSelectEdit(selectedData){
    selectedData.action="Edit";
    this.data=selectedData;
      console.log(selectedData);
     // this.fetchEditWorkCodes(this.data.staffSubj);
  }
  onSelectDelete(){
    this.saveResult="";
     
      this.apiService.deleteRemu(this.data.id).subscribe(
        ()=>console.log(`Entry with id =${this.data.id} deleted`),
        (err)=>console.log(err)
      );
     
      alert("Success! Entry Deleted");
      this.confirmDelete=false;
      this.clearRemu();
      this.fetchEntries();
      this.getSumAmt();
      this.stfNamechosen=false;
  }

  getSelectedRows() {
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    const selectedData = selectedNodes.map( node => node.data );
     selectedData.map( node => this.data=node);
     if(this.data.id>0){
     this.data.action="Edit";}
     this.selData=this.data.workAllotCodes;
     this.fetchEditWorkCodes(this.data.staffSubj+"~"+this.data.id);
    console.log("In sel Row"+this.data);
}



onFilterChanged(event) {  
  var abc:number=0;
  this.sumAmt=0;
    this.agGrid.api.forEachNodeAfterFilter(function(rowNode, index) {
      console.log('node ' + rowNode.data.amount + ' passes the filter');
      if(rowNode.data.amount>0){
      abc=abc+rowNode.data.amount;
    }
  });
    this.sumAmt=abc;
  }
  
  getSumAmt(){
    var abc:number=0;
  this.sumAmt=0;
    this.agGrid.api.forEachNode(function(rowNode, index) {
      console.log('node ' + rowNode.data.amount + ' passes the filter');
      if(rowNode.data.amount>0){
      abc=abc+rowNode.data.amount;
    }
  });
    this.sumAmt=abc;
  }
  
  
  exportAsXLSX():void {
      this.excelService.exportAsExcelFile(this.entryData, 'Remuneration');
  }
  
  
  clearFilter(){
    this.agGrid.api.setFilterModel(null);
  }

  
}
