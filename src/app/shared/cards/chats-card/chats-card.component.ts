import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-chats-card',
  templateUrl: './chats-card.component.html',
  styleUrls: ['./chats-card.component.scss']
})
export class ChatsCardComponent implements OnInit {
  @Input() name?: string;
  @Input() totalUnreadMessages?: string | number;
  @Input() for?: string;
  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
  }

  navigateToChats() {
    this.router.navigate(['chats'], {relativeTo: this.route.parent, queryParams: {
      for: this.for!!
    }});
  }

}
