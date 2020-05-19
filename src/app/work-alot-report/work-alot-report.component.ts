import { Component, OnInit } from '@angular/core';
import { ReportModel } from 'Model/report-model';
import { Router } from '@angular/router';

import { ApiService } from '../api.service';
import { ExcelService } from '../excel.service';

@Component({
  selector: 'app-work-alot-report',
  templateUrl: './work-alot-report.component.html',
  styleUrls: ['./work-alot-report.component.css']
})
export class WorkAlotReportComponent implements OnInit {

  data:ReportModel;
  entryData:any;
  wrkAltInt:any;  
  confirmDelete:boolean;
  viewResult:any;
  staffSubList:any;
  viewStaffEntryResult:any;
viewWorkAlotResult:any;
viewRemuResult:any;
sumAmt:number;
exportData:any;

  
  constructor(public apiService:ApiService,
    public router:Router,private excelService:ExcelService) {
    this.data=new ReportModel();
   
    this.confirmDelete=false;
    
   }

  ngOnInit(): void {
    this.clearData();
    this.fetchDistinctStaffEntries();
    this.fetchDistinctStaffsubEntries();
    this.sumAmt=0;
    this.data.standard="";
  }

  clearData(){
    this.data.report="";
    this.data.staffName="";
    this.data.standard="";
    this.data.taskStatus="";
    this.data.remuStatus="";
    this.data.pymtStatus="";
    this.data.staffSubj="";
    this.data.subject="";
    this.sumAmt=0;
  }
  selectReport(event){
    this.clearData();
    this.clearSelection();
this.data.report=event.target.value;
this.sumAmt=0;
this.data.standard="";
console.log("Report Name"+this.data.report);
  }

  viewReport(){

    this.viewResult="";  
    if(this.data.report==='staffEntry')  {      
     this.apiService.viewStaffReport(this.data).subscribe((response) => {
        console.log(response);
        this.viewStaffEntryResult=response;
      });
    }else if(this.data.report==='WorkAllotment')  {   
      this.viewWorkAlotResult="";   
      this.apiService.viewWorkReport(this.data).subscribe((response) => {
         console.log(response);
         this.viewWorkAlotResult=response;
       });
     }else if(this.data.report==='Remuneration')
     {
     if( this.data.remuFilter==='pymtStatus'
     && (this.data.pymtStatus==='Fully Paid' || this.data.pymtStatus==='Partially Paid')) {  
        this.viewRemuResult="";
      this.apiService.viewRemuReport(this.data).subscribe((response) => {
         console.log(response);
          this.viewRemuResult=response;  
         
       });
      
      }
       else if((this.data.remuFilter==='pymtStatus'
       && (this.data.pymtStatus==='Nil Paid' || this.data.pymtStatus==='NilPart Paid'))
       || (this.data.remuFilter==='others')){
          this.viewWorkAlotResult="";         
        this.apiService.viewWorkReport(this.data).subscribe((response) => {
          console.log(response);
          
          this.viewWorkAlotResult=response;
        });
      }
     }
      }

  fetchDistinctStaffEntries(){
    this.wrkAltInt="";     
    this.apiService.fetchDistinctStaffEntries().subscribe((response) => {
      this.wrkAltInt=response;       
    });
  }

  fetchDistinctStaffsubEntries(){
    this.staffSubList="";     
    this.apiService.fetchDistinctStaffSubEntries().subscribe((response) => {
      this.staffSubList=response;       
    });
  }

  clearSelection(){
    this.data=new ReportModel();
    this.viewResult=null;
    this.viewReport();

  }
  exportAsXLSX():void {
    this.exportData=this.data;
    this.excelService.exportAsExcelFile(this.exportData, 'sample');
 }

}
