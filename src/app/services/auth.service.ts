import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../Models/UserModel';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authUrl = "auth";
  private baseUrl = environment.api;
  private apiUrl = encodeURI(this.baseUrl + this.authUrl);

  constructor(private http: HttpClient, private router: Router) { }

  auth(email: string, password: string): Observable<User> {
    return this.http.post<User>(this.apiUrl, { email, password })
  }

  isAuthenticated(): boolean {
    let auth: boolean = JSON.parse(sessionStorage.getItem('user')!)

    if (auth) {
      return true
    } else {
      return false
    }
  }

  logout(): void {
    sessionStorage.removeItem('user');
    this.router.navigate(["/login"])
  }
}
