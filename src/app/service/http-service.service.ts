import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AddTodo, Todos } from '../dashboard/models/dashboard.model';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  
  endpoint: string = 'http://127.0.0.1:8000/api';
  constructor(private http: HttpClient) { }

  // Genel HTTP GET isteği
  get<T>(url: string, params?: HttpParams): Observable<T> {
    return this.http.get<T>(url, { params });
  }

  // Genel HTTP POST isteği
  // post<T>(url: string, body: any, headers?: HttpHeaders): Observable<T> {
  //   return this.http.post<T>(url, body, { headers });
  // }

  post(data: any){
    const a = (this.endpoint+"/todo/",data)
    return this.http.post<AddTodo>(this.endpoint+"/todo/",data)
  }


  // Genel HTTP PUT isteği
  put<T>(url: string, body: any, headers?: HttpHeaders): Observable<T> {
    return this.http.put<T>(url, body, { headers });
  }

  // Genel HTTP DELETE isteği
  delete(id: number) {
    return this.http.delete<Todos>(this.endpoint + "/todo/" + id + "/");
  }
}
