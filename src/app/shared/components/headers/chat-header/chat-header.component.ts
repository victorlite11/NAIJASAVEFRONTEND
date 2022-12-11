import { Component, Inject, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { ContributorModel } from 'src/app/shared/models/contributor-model/contributor-model';

@Component({
  selector: 'app-chat-header',
  templateUrl: './chat-header.component.html',
  styleUrls: ['./chat-header.component.scss']
})
export class ChatHeaderComponent implements OnInit {
  @Input() _id?: string;
  @Input() title?: string = "Chats"
  @Input() name?: string;
  @Input() phoneNumber?: string;
  contributor = new ContributorModel()
  constructor(
    private router: Router,
    private location: Location,
    private route: ActivatedRoute,
    @Inject('AUTH_KEY_PROPERTY_NAME') private authKeyName: string
  ) { }

  ngOnInit(): void {

  }

  moveBack() {
    this.location.back();
  }

  signOut() {
    sessionStorage.removeItem(this.authKeyName);
    localStorage.removeItem(this.authKeyName);
    this.router.navigateByUrl("/access");
  }

}
