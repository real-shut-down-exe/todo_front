import { Component, OnInit } from '@angular/core';
import { HttpService } from '../service/http-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Todos } from './models/dashboard.model';
import { faTrash, faPen} from '@fortawesome/free-solid-svg-icons';
import { Observable, from } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditModalComponent } from './components/edit-modal/edit-modal.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  endpoint: string = 'http://127.0.0.1:8000/api';
  faTrash = faTrash
  faPen = faPen
  postTodoForm: FormGroup
  toggleTodoForm: FormGroup

  constructor(
    private httpService: HttpService, 
    private router: Router,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private modalService: NgbModal
    ) {
    this.postTodoForm = this.fb.group({
      title: ['',Validators.required],
    })
    this.toggleTodoForm = this.fb.group({})
  }
  todos: Todos[] = [];

  ngOnInit() {
    this.fetchData()
  }

  fetchData(){
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

    this.httpService.put(toggleData.id,todo).subscribe(i=>{
    })
  }

  deleteTodo(id: any){
    return this.httpService.delete(id).subscribe(()=>{
      // this.todos = this.todos.filter((u: any) => u !== id);
      this.fetchData();
    });
  }

  postNewTodo(data: any){
    return this.httpService.post(this.postTodoForm.value).subscribe( data =>{
      this.fetchData();
      })
  }

  // getActivatedTodoId(){
  //   this.activatedRoute.paramMap.subscribe(todo =>{
  //     const id = todo.get('id');
  //     console.log(id);
  //   })
  // }

  openEditModal(id: number){
    const modalRef = this.modalService.open(EditModalComponent, {
      size: 'lg', // Size and other options can be set here as well
      centered: true,
    });
    modalRef.componentInstance.modalId = id;
    modalRef.closed.subscribe({
      next: (result) => {
        console.log('Modal closed with result:', result);
        this.fetchData();
      },
      error: (reason) => {
        console.log('Modal dismissed with reason:', reason);
      }
    });    
  }
  searchJobTerm: string = '';
  searchDateTerm: string = '';

  get filteredTodos(): Todos[] {
    return this.todos.filter(todo =>
      (todo.title.toLowerCase().includes(this.searchJobTerm.toLowerCase()) || !this.searchJobTerm) &&
      (this.searchDateTerm ? this.isValidDateTime(todo.created_at, this.searchDateTerm) : true)
    );
  }
  
  isValidDateTime(date: any, searchTerm: string): boolean {

    date = new Date(date).toLocaleString('tr', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });

    (date.toLowerCase().includes(this.searchDateTerm.toLowerCase()) || !this.searchJobTerm)
  
    const dateString = date
    return dateString.includes(searchTerm) || dateString.includes(`T${searchTerm}`);
  }

}
