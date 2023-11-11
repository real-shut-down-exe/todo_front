import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpService } from '../../../service/http-service.service';

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.css']
})
export class EditModalComponent {
  endpoint: string = 'http://127.0.0.1:8000/api';
  @Input() modalId: number = 0;
  editTodoForm: FormGroup

  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private httpService: HttpService,
    public activeModal: NgbActiveModal
  ) {
    this.editTodoForm = this.fb.group({
      title: ['',Validators.required],
      created_by: [localStorage.getItem("pk")]
    })
  }
  
  ngOnInit() {
    console.log(this.modalId);

    this.httpService.singelget(this.modalId).subscribe(i =>{
      this.editTodoForm.patchValue(i)
    })
  }

  editTodo(data: any): void{
    this.httpService.put(this.modalId,this.editTodoForm.value).subscribe(i=>{
      this.activeModal.close('Modal kapatıldı');
    })
  }

}
