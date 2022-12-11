import { Component, Inject, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-balance-header',
  templateUrl: './balance-header.component.html',
  styleUrls: ['./balance-header.component.scss']
})
export class BalanceHeaderComponent implements OnInit {
  @Input() title?: string;
  @Input() balance?: string;
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
