import { Component } from '@angular/core';
import { HttpService } from '../service/http-service.service';
import { Router } from '@angular/router';
import { Todos } from './models/dashboard.model';
import { faTrash, faPen} from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  endpoint: string = 'http://127.0.0.1:8000/api';
  faTrash = faTrash
  faPen = faPen

  constructor(private httpService: HttpService, private router: Router) { }
  todos: Todos[] = [];

  ngOnInit() {
    this.fetchData()
  }

  fetchData() {
    this.httpService.get<any>(`${this.endpoint}/todo/`)
    .subscribe(data => {
      this.todos = data;
      console.log(this.todos)
    });
  }

  toggle = {
    is_deleted: false
  };

  toggleIsDeleted(todo: Todos) {
    const toggleData = {
      id: todo.id,
    };
    todo.is_deleted = !todo.is_deleted;
    console.log(todo)
  }

  deleteTodo(id: any){
    return this.httpService.delete(id).subscribe(()=>{
      // this.todos = this.todos.filter((u: any) => u !== id);
      this.fetchData();
    });
  }
  
}
