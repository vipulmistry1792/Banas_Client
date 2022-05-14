import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EnergyData } from '../energy-data';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../_models';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class TimeseriesService {
  constructor(private http: HttpClient) { }
  getdata (): Observable<EnergyData[]> {
    return this.http.get<EnergyData[]>('./assets/energy_data.json');
  }
  getMeterHistory (meterdata): Observable<EnergyData[]> {
    return this.http.post<EnergyData[]>(`${environment.apiUrl}/api/meterdata`,meterdata);
  }
  getMeterconsuptionDay (meterdata): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/api/meterdata/daywise`,meterdata);
  }
  getMeterconsuptionmonth (meterdata): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/api/meterdata/monthwise`,meterdata);
  }
  getfaultHisory (meterdata): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/api/meterdata/faulthistory`,meterdata);
  }
  getfaultsummary (meterdata): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/api/meterdata/faultsummary`,meterdata);
  }
  getfaultsummarybyequipment (meterdata): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/api/meterdata/faultsummarybyequipment`,meterdata);
  }
  getconsumption (meterdata): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/api/meterdata/usedEnergy`,meterdata);
  }
  runningmonthData (meterdata): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/api/meterdata/currentmonthdata`,meterdata);
  }
  getDGHistory (meterdata): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/api/meterdata/dghistory`,meterdata);
  }
  getDGConsumption (meterdata): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/api/meterdata/dgcon`,meterdata);
  }
  getDGstatus (meterdata): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/api/meterdata/dgstatus`,meterdata);
  }
}
