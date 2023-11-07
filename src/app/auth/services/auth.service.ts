import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  endpoint: string = 'http://127.0.0.1:8000/api';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  currentUser = {};

  constructor(private http: HttpClient, private router: Router) { }

  // Sign-in
  signIn(user: User) {
    console.log(`${this.endpoint}/user/token/`)
    return this.http
      .post<any>(`${this.endpoint}/user/token/`, user)
      .subscribe((res: any) => {
        localStorage.setItem('access_token', res.access);
        this.router.navigate(['/dashboard']);
        
      });
  }
}
