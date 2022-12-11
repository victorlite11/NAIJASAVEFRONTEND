import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IdentityModel } from 'src/app/shared/models/contributor-model/contributor-model';
import { IdentityService } from 'src/app/shared/services/identity/identity.service';

@Component({
  selector: 'app-identity',
  templateUrl: './identity.component.html',
  styleUrls: ['./identity.component.scss']
})
export class IdentityComponent implements OnInit {
  title="Identity";
  name="Account Type";
  accountType = "Unknown";
  identity: IdentityModel = new IdentityModel()
  fetchingIdentity = true;
  updatingIdentity = false;
  contributor_id: string = "";
  constructor(
    private route: ActivatedRoute,
    private identityService: IdentityService
  ) { }

  ngOnInit(): void {
    this.init();
  }

  async init() {
    this.fetchingIdentity = true;
    this.route.queryParams.subscribe(async query => {
      if(!query.subordinate_id) {
        this.route.data.subscribe(async data => {
          this.identity = await this.identityService.fetchIdentity(data.contributor_id);
          this.fetchingIdentity = false;
          this.contributor_id = data.contributor_id;
          if(this.identity.isContributor) {
            this.accountType = "Contributor";
          } else if(this.identity.isInvestor) {
            this.accountType = "Investor";
          } else if(this.identity.isSubContributor) {
            this.accountType = "Sub Contributor";
          } else if(this.identity.isSuperContributor) {
            this.accountType = "Super Contributor";
          } else {
            this.accountType = "UNKNOWN"
          }
        })
      } else {
        this.identity = await this.identityService.fetchIdentity(query.subordinate_id);
          this.fetchingIdentity = false;
          this.contributor_id = query.subordinate_id;
          if(this.identity.isContributor) {
            this.accountType = "Contributor";
          } else if(this.identity.isInvestor) {
            this.accountType = "Investor";
          } else if(this.identity.isSubContributor) {
            this.accountType = "Sub Contributor";
          } else if(this.identity.isSuperContributor) {
            this.accountType = "Super Contributor";
          } else {
            this.accountType = "UNKNOWN"
          }
      }
    })
  }

  async updateIdentity(interest: "super" | "sub" | "investor" | "contributor") {
    let interested_identity = {interested_identity: interest};
    this.updatingIdentity = true;
    await this.identityService.changeContributorIdentity(this.contributor_id, interested_identity).then(async result => {
      this.updatingIdentity = false;
      await this.init();
    })
  }

}
