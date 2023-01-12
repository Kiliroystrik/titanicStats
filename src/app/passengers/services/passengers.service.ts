import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Passenger } from '../models/PassengerModel';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PassengersService {

  private passengersUrl = "passengers/";
  private baseUrl = environment.api;
  private apiUrl = encodeURI(this.baseUrl + this.passengersUrl);

  constructor(private http: HttpClient) { }

  getPassengers(sex?: string[], survived?: string[], age?: string, pclass?: string[]): Observable<Passenger[]> {

    let params = new HttpParams();

    if (sex) {
      params = params.append("sex", sex.toString())
    }
    if (survived) {
      params = params.append("survived", survived.toString())
    }
    if (age) {
      params = params.append("age", age.toString())
    }
    if (pclass) {
      params = params.append("pclass", pclass.toString())
    }

    return this.http.get<Passenger[]>(this.apiUrl, { params: params })
  }


  search(name: string): Observable<Passenger[]> {
    return this.http.get<Passenger[]>(this.apiUrl + 'search/' + name)
  }


}
