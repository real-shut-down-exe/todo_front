import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  endpoint: string = 'http://127.0.0.1:8000/api';
  constructor(private http: HttpClient, private router: Router) { }

  // Sign-in
  signIn(user: User) {
    return this.http
      .post<any>(`${this.endpoint}/user/login/`, user,)
      .subscribe(res  => {
        this.router.navigate(['/dashboard']);
      });
  }

  signUp(user: User) {
    return this.http
      .post(`${this.endpoint}/user/signup/`, user,)
      .subscribe(res  => {
        this.router.navigate(['/dashboard']);
      });
  }
}
