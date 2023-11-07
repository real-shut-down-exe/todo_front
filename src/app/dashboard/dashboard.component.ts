import { Component } from '@angular/core';
import { HttpService } from '../service/http-service.service';
import { Router } from '@angular/router';
import { Todos } from './models/dashboard.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  endpoint: string = 'http://127.0.0.1:8000/api';

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
}
