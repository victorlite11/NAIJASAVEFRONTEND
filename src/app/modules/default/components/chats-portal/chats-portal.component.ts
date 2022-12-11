import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchComponent } from 'src/app/shared/dialogs/search/search.component';
import { ConcernedChatsResponse } from 'src/app/shared/models/chats/chats-model';
import { ContributorModel } from 'src/app/shared/models/contributor-model/contributor-model';
import { ChatsService } from 'src/app/shared/services/chats/chats.service';
import { ContributorsService } from 'src/app/shared/services/contributors/contributors.service';

@Component({
  selector: 'app-chats-portal',
  templateUrl: './chats-portal.component.html',
  styleUrls: ['./chats-portal.component.scss']
})
export class ChatsPortalComponent implements OnInit {
  concernedChats = new ConcernedChatsResponse();
  name = "Total Unread Messages";
  title = "All Chats"
  fetchingChats = true;
  constructor(
    private chatsService: ChatsService,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private contributorsService: ContributorsService
  ) { }

  ngOnInit(): void {
    this.init();
  }

  private async init() {
    this.fetchingChats = true;
    this.route.data.subscribe(async data => {
      let contributor = await this.contributorsService.getContributor(data.contributor_id);
      let category: "admin" | "overseer" = "overseer";

      this.concernedChats = await this.chatsService.retrieveConcernedChats(category, data.contributor_id) // change to admin_id
      })
    this.fetchingChats = false;
  }

  openSearchPortal() {
    this.router.navigate(['search-portal'],{relativeTo: this.route.parent, queryParams : {
      destination : "conversation"
    }});
  }

}
