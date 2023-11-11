import { Component, OnInit } from '@angular/core';
import { HttpService } from '../service/http-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Todos, AddTodo } from './models/dashboard.model';
import { faTrash, faPen} from '@fortawesome/free-solid-svg-icons';
import { Observable, from } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditModalComponent } from './components/edit-modal/edit-modal.component';
import { User } from '../auth/models/user.model';

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
  otherUserMail: FormGroup
  selectedOption: string = "1";

  constructor(
    private httpService: HttpService, 
    private router: Router,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private modalService: NgbModal
    ) {
    this.postTodoForm = this.fb.group({
      title: ['',Validators.required],
      created_by: [localStorage.getItem("pk")]
    })
    this.otherUserMail = this.fb.group({
      mail: ['emre@emre.com'],
    })
    this.toggleTodoForm = this.fb.group({})
  }
  todos: Todos[] = [];
  orjinalTodoList: Todos[] = [];

  ngOnInit() {
    this.fetchData()
    this.loginUser()
  }

  fetchData(){
    const created_by = localStorage.getItem("pk")
    const id = created_by ? parseInt(created_by, 10) : 0;
    console.log()
    this.httpService.getAllTodosById(id).subscribe(
      data =>{
        this.todos = data;
        this.orjinalTodoList = data;
      });
  }

  toggle = {
    is_deleted: false
  };

  toggleIsDeleted(todo: AddTodo) {
    const created_by = localStorage.getItem("pk") ?? "";
    const toggleData = {
      pk: todo.pk,
    };
    todo.is_deleted = !todo.is_deleted;
    todo.created_by = created_by

    this.httpService.put(toggleData.pk,todo).subscribe(i=>{
    })
  }
  
  test(event: Event){
    console.log(this.selectedOption)
    if(this.selectedOption === '1'){
      this.fetchData();
      this.todos = this.orjinalTodoList;
    }
    if(this.selectedOption === '2'){
      this.todos = this.orjinalTodoList;
      this.todos = this.todos.filter(todo => todo.is_deleted);
    }
    if(this.selectedOption === '3'){
      this.todos = this.orjinalTodoList;
      this.todos = this.todos.filter(todo => !todo.is_deleted);
    }
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

  otherUserId: string = ""
  loginUser() {
    this.httpService.findUserByMail(this.otherUserMail.value).subscribe(
      (response: User) => {
        this.otherUserId = response.pk
    });
  }
}
