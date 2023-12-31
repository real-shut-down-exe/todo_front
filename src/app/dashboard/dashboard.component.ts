import { Component, OnInit } from '@angular/core';
import { HttpService } from '../service/http-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Todos, AddTodo, TodoList, ConnectionRequest } from './models/dashboard.model';
import { faTrash, faPen } from '@fortawesome/free-solid-svg-icons';
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
export class DashboardComponent implements OnInit {
  endpoint: string = 'http://127.0.0.1:8000/api';
  faTrash = faTrash
  faPen = faPen
  postTodoForm: FormGroup
  toggleTodoForm: FormGroup
  otherUserMail: FormGroup
  sendRequestForm: FormGroup
  selectedOption: string = "1";
  OrderOption: string = "1";
  isAccept: boolean = false;
  myMail = localStorage.getItem("mail")
  isLoading: boolean = false;
  isError: boolean = false;
  errorMesage = ""; 
  isSuccess: boolean = false;
  

  constructor(
    private httpService: HttpService,
    private router: Router,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private modalService: NgbModal
  ) {
    this.postTodoForm = this.fb.group({
      title: ['', Validators.required],
      created_by: [localStorage.getItem("pk")]
    })
    this.otherUserMail = this.fb.group({
      mail: ['emre@emre.com'],
    })
    this.toggleTodoForm = this.fb.group({})
    this.sendRequestForm = this.fb.group({
      sender: ['', Validators.required],
      receiver: [localStorage.getItem("mail")]
    })
    this.isAccept = false;
  }

  todos: Todos[] = [];
  orjinalTodoList: Todos[] = [];
  acceptConnectionsTodos: TodoList[] = [];
  connectionRequestList: ConnectionRequest[] = [];

  ngOnInit() {
    if (localStorage.getItem("mail")) {
      this.isLoading = true
      this.fetchData()
      this.haveAnAcceptConnections()
      this.fetchAcceptConnectionsTodos()
      this.connectionRequest()
      this.isLoading = false
    }
    else {
      this.router.navigate(['/']);
    }
  }

  fetchData() {
    this.isLoading = true
    const created_by = localStorage.getItem("pk")
    const id = created_by ? parseInt(created_by, 10) : 0;
    console.log()
    this.httpService.getAllTodosById(id).subscribe(
      data => {
        this.todos = data;
        this.orjinalTodoList = data;
      });
      this.isLoading = false
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

    this.httpService.put(toggleData.pk, todo).subscribe(i => {
    })
  }

  oreder(event: Event) {
    console.log(this.selectedOption)
    if (this.selectedOption === '1') {
      this.fetchData();
    }
    if (this.selectedOption === '2') {
      this.todos = this.orjinalTodoList;
      this.todos = this.todos.filter(todo => todo.is_deleted);
    }
    if (this.selectedOption === '3') {
      this.todos = this.orjinalTodoList;
      this.todos = this.todos.filter(todo => !todo.is_deleted);
    }
  }

  deleteTodo(id: any) {
    return this.httpService.delete(id).subscribe(() => {
      // this.todos = this.todos.filter((u: any) => u !== id);
      this.fetchData();
    });
  }

  postNewTodo(data: any) {
    return this.httpService.post(this.postTodoForm.value).subscribe(data => {
      this.isSuccess = true;
      this.sn1();
      this.fetchData();
    })
  }

  openEditModal(id: number) {
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

  sendRequest(data: any) {
    this.isLoading = true
    return this.httpService.sendARequest(this.sendRequestForm.value).subscribe(data => {
      this.isLoading = false
      this.isSuccess = true
      this.sn3()
      this.sn1()
    },
    error => {
      this.isLoading = false
      this.errorMesage = error.error.error
      this.isError = true
      this.sn3()
    })
  }

  sn3(): Promise<any> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        this.errorMesage = ""
        this.isError = false
        this.isLoading = false
        resolve('Operation completed successfully');
      }, 2500); // 2.5 seconds
    });
  }

  sn1(): Promise<any> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        this.isSuccess = false
        resolve('Operation completed successfully');
      }, 1000); // 1 seconds
    });
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/']);
  }

  haveAnAcceptConnections() {
    const data = { sender: localStorage.getItem("mail") };
    this.httpService.haveAnAcceptConnections(data).subscribe(response => {
      this.isAccept = response;
    });
  }

  fetchAcceptConnectionsTodos() {
    const data = { sender: localStorage.getItem("mail") };
    this.httpService.fetchAcceptConnectionsTodos(data).subscribe(response => {
      this.acceptConnectionsTodos = response
    });
  }

  connectionRequest(){
    const data = { receiver: localStorage.getItem("mail") };
    this.httpService.connectionRequest(data).subscribe(response => {
      this.connectionRequestList = response
    });
  }

  updateConnectionRequest(data:any){
    data.receiver = localStorage.getItem("mail")
    data.is_accepted = true

    this.httpService.updateConnectionRequest(data).subscribe(response => {
      console.log()
    });
  }

  deleteConnectionRequest(data:any){
    data.receiver = localStorage.getItem("mail")
    data.is_accepted = true

    this.httpService.deleteConnectionRequest(data).subscribe(response => {
      console.log()
    });
  }

  AscTodo(){
    this.httpService.ascTodo().subscribe(response => {
      this.todos = response
      this.orjinalTodoList =response
      console.log()
    });
  }

  DescTodo(){
    this.httpService.descTodo().subscribe(response => {
      this.todos = response
      this.orjinalTodoList =response
      console.log()
    });
  }

  ascDesc(event: Event) {
    console.log(this.OrderOption)
    if (this.OrderOption === '0') {
      this.fetchData()
    }
    if (this.OrderOption === '1') {
      this.AscTodo()
    }
    if (this.OrderOption === '2') {
      this.DescTodo()
    }
  }
}