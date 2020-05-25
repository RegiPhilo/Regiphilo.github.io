import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StaffEntryComponent } from './staff-entry/staff-entry.component';
import { HomeComponent } from './home/home.component';
import { ApiService } from './api.service';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { WorkAllotmentComponent } from './work-allotment/work-allotment.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { RemunerationComponent } from './remuneration/remuneration.component';
import { WorkAlotReportComponent } from './work-alot-report/work-alot-report.component';
import { ReminderComponent } from './reminder/reminder.component';
import { AgGridModule } from 'ag-grid-angular';
import { ExcelService } from './excel.service';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';


@NgModule({
  declarations: [
    AppComponent,
    StaffEntryComponent,
    HomeComponent,
    WorkAllotmentComponent,
    RemunerationComponent,
    WorkAlotReportComponent,
    ReminderComponent
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgbModule,
    HttpClientModule,
    BsDatepickerModule.forRoot(),
    AppRoutingModule,
    AgGridModule.withComponents([]),
    NgMultiSelectDropDownModule
  ],
  providers: [ApiService,ExcelService],
  bootstrap: [AppComponent],
  exports:[
    BsDatepickerModule
  ]
})
export class AppModule { }
