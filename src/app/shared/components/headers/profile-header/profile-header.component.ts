import { Component, Inject, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-profile-header',
  templateUrl: './profile-header.component.html',
  styleUrls: ['./profile-header.component.scss']
})
export class ProfileHeaderComponent implements OnInit {
  @Input() name?: string;
  @Input() balance?: string;
  @Input() accountType?: string;
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
