import { Component, Inject, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-transaction-header',
  templateUrl: './transaction-header.component.html',
  styleUrls: ['./transaction-header.component.scss']
})
export class TransactionHeaderComponent implements OnInit {
  @Input() title?: string;
  @Input() balance?: number;
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
