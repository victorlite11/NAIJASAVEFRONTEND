import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChatModel, IChatsPayload } from 'src/app/shared/models/chats/chats-model';
import { ContributorModel } from 'src/app/shared/models/contributor-model/contributor-model';
import { ChatsService } from 'src/app/shared/services/chats/chats.service';
import { ContributorsService } from 'src/app/shared/services/contributors/contributors.service';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.scss']
})
export class ChatsComponent implements OnInit, OnDestroy {
  for_id = "";
  thereIsFor = false;
  chats: ChatModel[] = [];
  interest: "subordinate" | "admin" | "overseer" = "overseer";
  intervalId?: any;
  category: "overseer" | "admin" = "overseer";
  contributor = new ContributorModel();
  subordinate = new ContributorModel();

  chat = new ChatModel();

  constructor(
    private chatsService: ChatsService,
    private contributorsService: ContributorsService,
    private route: ActivatedRoute
  ) { }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }

  ngOnInit(): void {

    this.init();
  }

  async init() {
    this.route.queryParams.subscribe(async query => {
      if(query.for) {
        this.subordinate = await this.contributorsService.getContributor(query.for);
        this.interest = "subordinate";
        this.thereIsFor = true;
      } else {
        this.thereIsFor = false;
      }

      this.route.data.subscribe(async data => {
        this.contributor = await this.contributorsService.getContributor(data.contributor_id);

        this.refresh();

        this.intervalId = setInterval(() => {
          this.refresh();
        }, 1000);
      })
    })
  }

  async refresh() {
    this.route.queryParams.subscribe(async query => {
      // change for_id to subordinate own if you have interest in chatting with
      // your subordinate, else the for_id property should be pointing to your
      // own id to enable you message your overseer or head admin
      // update the category appropriately (if interest is in subordinate, the category must be overseer)
      if(this.interest == "subordinate") {
        this.for_id = query.for;
        this.category = "overseer"
      } else {
        this.for_id = this.contributor._id!!;
        this.category = this.interest
      }

      this.chats = await this.chatsService.retrieveChatsFor({
        for: this.for_id,
        category: this.category
      });

    })
  }

  async send() {
    let payload = new IChatsPayload();

    this.route.queryParams.subscribe(async query => {
      if(this.interest == "subordinate") {
        this.for_id = query.for;
        this.category = "overseer"
      } else {
        this.for_id = this.contributor._id!!;
        this.category = this.interest
      }

      payload.for = this.for_id;
      payload.category = this.category;

      this.chat.from = this.contributor._id!!;

      switch (this.interest) {
        case "subordinate":
          this.chat.to = query.for
          break;
        case "overseer":
          this.chat.to = "overseer" // contributor's overseer
          break;
        case "admin":
          this.chat.to = "admin"
          break;
        default:
          break;
      }

      payload.chat = this.chat;
      await this.chatsService.insertChat(payload);
  
      this.chat.message = "";
  
      this.refresh();

    })
  }

}
