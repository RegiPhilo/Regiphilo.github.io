import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StaffEntryComponent } from './staff-entry/staff-entry.component';
import { WorkAllotmentComponent } from './work-allotment/work-allotment.component';
import { RemunerationComponent } from './remuneration/remuneration.component';
import { WorkAlotReportComponent } from './work-alot-report/work-alot-report.component';


const routes: Routes = [
  //{path:'', pathMatch:'full',redirectTo:'list'},
  {path:'staffEntry',component:StaffEntryComponent},
  {path:'workAllotment',component:WorkAllotmentComponent},
  {path:'remuneration',component:RemunerationComponent},
  {path:'viewReports',component:WorkAlotReportComponent}
  
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
