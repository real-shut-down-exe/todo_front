import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-error-mesage',
  templateUrl: './error-mesage.component.html',
  styleUrls: ['./error-mesage.component.css']
})
export class ErrorMesageComponent {
    @Input() isError: boolean = false;
    @Input() errorMesage: string = "";
}
