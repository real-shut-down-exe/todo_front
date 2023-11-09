import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from 'src/app/service/http-service.service';

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.css']
})
export class EditModalComponent {

  @Input() modalId: number = 0;
  editTodoForm: FormGroup

  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private httpService: HttpService, 
  ) {
    this.editTodoForm = this.fb.group({
      title: ['',Validators.required],
    })
  }
  
  ngOnInit() {
    console.log(this.modalId);

    this.httpService.singelget(this.modalId).subscribe(i =>{
      this.editTodoForm.patchValue(i)
    })
  }


}
