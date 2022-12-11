import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-announcement-card',
  templateUrl: './announcement-card.component.html',
  styleUrls: ['./announcement-card.component.scss']
})
export class AnnouncementCardComponent implements OnInit {
  @Input() title?: string = '';
  @Input() body?: string = '';
  @Input() date?: string = '';
  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {

  }

  showContributors() { 
  }

}
