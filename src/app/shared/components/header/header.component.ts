import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() onSidebarToggle = new EventEmitter<any>();
  @Input() title : string = "";
  @Input() loggedIn = true;
  @Input() canMoveBack = true;
  @Input() showAside = true;
  navigated = false;
  constructor(
    private router: Router,
    private location: Location,
    private route: ActivatedRoute
  ) { }

  moveBack() {
    this.location.back();
  }

  ngOnInit(): void {
    this.navigated = this.router.navigated ? true : false;
  }

}
