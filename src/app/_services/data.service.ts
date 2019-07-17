import { Injectable, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  listURL = 'https://tehcon.com.hr/api/CroatiaTownAPI/list.php';
  detailsURL = 'https://tehcon.com.hr/api/CroatiaTownAPI/details.php';

  countyID;

  state = 0; // 0 - nothing, 1 - county selected, 2 - details

  @Output() change: EventEmitter<number> = new EventEmitter();

  constructor(private http:HttpClient) { }

  getList(entityType): Observable<any> {
    let params = new HttpParams();
    params = params.append('v', '1');
    params = params.append('entityType', entityType);
    return this.http.get(this.listURL, {responseType: 'json', params: params});
  }

  getDetails(entityType, id) {
    let params = new HttpParams();
    params = params.append('v', '1');
    params = params.append('entityType', entityType);
    params = params.append('ID', id);
    return this.http.get(this.detailsURL, {responseType: 'json', params: params});
  }

  setCounty(id) {
    this.state = 1;
    this.countyID = id;
    this.change.emit(1);
  }

  search() {
    this.state = 2;
    this.change.emit(2);
  }

/*   resultClick(entity, county, id) {
    this.state = 1;
    this.countyID = county;
  } */


  

}
