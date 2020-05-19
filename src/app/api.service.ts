import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders,HttpErrorResponse, HttpParams} from '@angular/common/http';
import {Observable,throwError} from 'rxjs';
import {retry, catchError} from 'rxjs/operators';

import { StaffEntryModel } from 'Model/staff-entry-model';
import * as _ from 'lodash';
import { WorkAllotmentComponent } from './work-allotment/work-allotment.component';
import { WorkAllotModel } from 'Model/work-allot-model';
import { RemuModel } from 'Model/remu-model';
import { ReportModel } from 'Model/report-model';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }

HttpOptions={
  headers:new HttpHeaders({
    'Content-Type':'application/json'
  })
}

//Handle API Erros
handleError(error:HttpErrorResponse){
  if(error.error instanceof ErrorEvent){
    console.error('An error occurred:',error.error.message);
  }else{
console.error(
  `Backend returned code ${error.status},`+
  `body was : ${error.error}`);

  }

  return throwError(
    'Something bad happened; please try again later.');  
};

makeStaffEntry(item):Observable<StaffEntryModel>{
  return this.http
  .post<StaffEntryModel>("http://localhost:8080/api/staff/makeEntry",JSON.stringify(item),this.HttpOptions)
  .pipe(
    retry(2),catchError(this.handleError)
  )
}

saveRemu(item):Observable<RemuModel>{
  return this.http
  .post<RemuModel>("http://localhost:8080/api/remu/saveRemu",JSON.stringify(item),this.HttpOptions)
  .pipe(
    retry(2),catchError(this.handleError)
  )
}

saveWorkAlot(item):Observable<WorkAllotModel>{
  return this.http
  .post<WorkAllotModel>("http://localhost:8080/api/work/saveWrkAlotmnt",JSON.stringify(item),this.HttpOptions)
  .pipe(
    retry(2),catchError(this.handleError)
  )
}

viewStaffReport(item):Observable<StaffEntryModel>{
  return this.http
  .post<StaffEntryModel>("http://localhost:8080/api/staff/viewReport",JSON.stringify(item),this.HttpOptions)
  .pipe(
    retry(2),catchError(this.handleError)
  )
}
viewWorkReport(item):Observable<WorkAllotModel>{
  return this.http
  .post<WorkAllotModel>("http://localhost:8080/api/work/viewReport",JSON.stringify(item),this.HttpOptions)
  .pipe(
    retry(2),catchError(this.handleError)
  )
}
viewRemuReport(item):Observable<RemuModel>{
  return this.http
  .post<RemuModel>("http://localhost:8080/api/remu/viewReport",JSON.stringify(item),this.HttpOptions)
  .pipe(
    retry(2),catchError(this.handleError)
  )
}

deleteEntry(id:number):Observable<void>{
  return this.http.delete<void>(`http://localhost:8080/api/staff/deleteEntry/${id}`)
  .pipe(catchError(this.handleError));
  }

deleteWorkAlot(id:number):Observable<void>{
  return this.http.delete<void>(`http://localhost:8080/api/work/deleteWorkAlot/${id}`)
  .pipe(catchError(this.handleError));  
}

deleteRemu(id:number):Observable<void>{
  return this.http.delete<void>(`http://localhost:8080/api/remu/deleteRemuEntry/${id}`)
  .pipe(catchError(this.handleError));  
}

fetchEntries():Observable<String>{
  return this.http
  .get<String>("http://localhost:8080/api/staff/getDetails",this.HttpOptions)
  .pipe(
    retry(2),catchError(this.handleError)
  )
}

fetchDistinctStaffEntries():Observable<String>{
  return this.http
  .get<String>("http://localhost:8080/api/staff/getDistinctEntries",this.HttpOptions)
  .pipe(
    retry(2),catchError(this.handleError)
  )
}

fetchPrevId():Observable<number>{
  return this.http
  .get<number>("http://localhost:8080/api/staff/getPrevId",this.HttpOptions)
  .pipe(
    retry(2),catchError(this.handleError)
  )
}

fetchAllWorkAltmnts():Observable<String>{
  return this.http
  .get<String>("http://localhost:8080/api/work/getAllWorkAltments",this.HttpOptions)
  .pipe(
    retry(2),catchError(this.handleError)
  )
}

getDropDownText(id, object){
  const selObj = _.filter(object, function (o) {
      return (_.includes(id,o.id));
  });
  console.log("+IN API SERVICE SELVALUE"+selObj)
  return selObj;
}

fetchAllEntries():Observable<String>{
  return this.http
  .get<String>("http://localhost:8080/api/entry/getAllEntries",this.HttpOptions)
  .pipe(
    retry(2),catchError(this.handleError)
  )
}

fetchAllRemunerations():Observable<String>{
  return this.http
  .get<String>("http://localhost:8080/api/remu/getAllRemuDetails",this.HttpOptions)
  .pipe(
    retry(2),catchError(this.handleError)
  )
}

fetchDistinctStaffSubEntries():Observable<String>{
  return this.http
  .get<String>("http://localhost:8080/api/work/getDistinctStafSubEntries",this.HttpOptions)
  .pipe(
    retry(2),catchError(this.handleError)
  )
}




/*
searchOrderHistory(item):Observable<OrderModel>{
  return this.http
  .post<OrderModel>("http://localhost:8080/api/order/orderHistory",JSON.stringify(item),this.HttpOptions)
  .pipe(
    retry(2),catchError(this.handleError)
  )
}
*/




}
