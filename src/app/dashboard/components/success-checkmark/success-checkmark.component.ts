import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-success-checkmark',
  templateUrl: './success-checkmark.component.html',
  styleUrls: ['./success-checkmark.component.css']
})
export class SuccessCheckmarkComponent {
  @Input() isSuccess: boolean = false;
}
