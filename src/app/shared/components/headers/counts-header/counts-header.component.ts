import { Component, Inject, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-counts-header',
  templateUrl: './counts-header.component.html',
  styleUrls: ['./counts-header.component.scss']
})
export class CountsHeaderComponent implements OnInit {
  @Input() title?: string;
  @Input() count?: number | string;
  @Input() name?: string;
  @Input() sub_text?: string;
  authKeyName: string;
  constructor(
    private router: Router,
    private location: Location,
    private route: ActivatedRoute,
    @Inject('AUTH_KEY_PROPERTY_NAME') authKeyName: string
  ) { 
    this.authKeyName = authKeyName;
  }

  ngOnInit(): void {
  }

  moveBack() {
    this.location.back();
  }

  signOut() {
    sessionStorage.removeItem(this.authKeyName);
    localStorage.removeItem(this.authKeyName);
    this.router.navigateByUrl("/home");
  }

}
