import { Component, OnInit, ViewChild } from '@angular/core';
import { RemuModel } from 'Model/remu-model';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { AgGridAngular } from 'ag-grid-angular';
import { ExcelService } from '../excel.service';

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

 
  columnDefs = [
    {headerName: 'Id', field: 'id', sortable: true, filter: true,checkboxSelection: true},
    {headerName: 'Payment Date', field: 'pymtDateString', sortable: true, filter: true},
    {headerName: 'Staff and Subject', field: 'staffSubj', sortable: true, filter: true},
    {headerName: 'Amount', field: 'amount', sortable: true, filter: true},
    {headerName: 'Payment Mode', field: 'pymtMode', sortable: true, filter: true},
    {headerName: 'Payment Status', field: 'pymtStatus', sortable: true, filter: true},
    {headerName: 'Work Codes', field: 'workCodes', sortable: true, filter: true},
    {headerName: 'Remarks', field: 'remarks', sortable: true, filter: true}
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
   
  }

  saveRemu(){

    this.saveResult="";
      this.data.pymtDate=this.data.pymtDateString;
    this.apiService.saveRemu(this.data).subscribe((response) => {
        console.log(response);
        this.saveResult=response;
      });
      this.clearRemu();
      
      alert("Success! Entry Saved");
      this.fetchEntries();
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
      this.clearRemu();
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
