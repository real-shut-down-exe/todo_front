import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Todos, AddTodo, ConnectionRequest  } from '../dashboard/models/dashboard.model';
import { User } from '../auth/models/user.model';

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
  post(data: any){
    const a = (this.endpoint+"/todo/",data)
    return this.http.post<any>(this.endpoint+"/todo/",data)
  }

  // Genel HTTP PUT isteği
  put(id:number, data: any){
    return this.http.put<AddTodo>(this.endpoint+"/todo/"+id+"/",data)
  }

  // Genel HTTP DELETE isteği
  delete(id: number) {
    return this.http.delete<Todos>(this.endpoint + "/todo/" + id + "/");
  }

  singelget(id: number){
    return this.http.get<Todos>(this.endpoint + "/todo/" + id + "/");
  }

  getAllTodosById(createdBy: number): Observable<any> {
    const requestData = { created_by: createdBy };
    return this.http.post(`${this.endpoint}/todo/get_all_todo_by_id/`, requestData);
  }

  sendARequest(data: any){
    return this.http.post<AddTodo>(this.endpoint+"/connectionRequest/sendARequest/",data)
  }

  haveAnAcceptConnections(data: any){
    return this.http.post<boolean>(this.endpoint+"/connectionRequest/HaveAnAcceptConnections/",data)
  }
  
  fetchAcceptConnectionsTodos(data: any){
    return this.http.post<any>(this.endpoint+"/connectionRequest/fetchAcceptConnectionsTodos/",data)
  }
  
  connectionRequest(data: any){
    return this.http.post<any>(this.endpoint+"/connectionRequest/HaveAnyRequest/",data)
  }
  
  updateConnectionRequest(data: any){
    return this.http.post<ConnectionRequest>(this.endpoint+"/connectionRequest/updateConnectionRequest/",data)
  }
}