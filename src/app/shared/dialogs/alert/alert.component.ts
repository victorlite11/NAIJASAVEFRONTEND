import { Component, Input, OnInit, OnChanges} from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit{
  @Input() type : "success" | "error" = "success";
  @Input() message : string = "No message";
  constructor() { }

  ngOnInit(): void {
  }

}
