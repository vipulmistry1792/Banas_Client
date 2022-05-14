import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../_models';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class MeterMasterService {

  constructor(
    private router: Router,
    private http: HttpClient
    ) { }
    getAll() {
      return this.http.get<any>(`${environment.apiUrl}/api/meter`);
  }
}
