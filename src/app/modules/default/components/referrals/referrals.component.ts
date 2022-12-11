import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BasicContributorModel, ReferralData } from 'src/app/shared/interface/shared-interface';
import { ReferralService } from 'src/app/shared/services/referral/referral.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-referrals',
  templateUrl: './referrals.component.html',
  styleUrls: ['./referrals.component.scss']
})
export class ReferralsComponent implements OnInit {
  fetchingReferrals = true;
  title = "Referral";
  balance = 0;
  referred: BasicContributorModel[] = [];
  referralData: ReferralData = new ReferralData();
  invitationLink: string;
  isSubordinate = false;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private referralService: ReferralService,
    @Inject('INVITATION_LINK') invitationLink: string
  ) { 
    this.invitationLink = invitationLink;
  }

  ngOnInit(): void {
    this.fetchingReferrals = true;
    this.route.queryParams.subscribe(async query => {
      if(!query.subordinate_id) {
        this.route.data.subscribe(async data => {
          this.referralData = await this.referralService.getReferralData(data.contributor_id);
          this.invitationLink += this.referralData.code;
          this.fetchingReferrals = false;
        })
      } else {
        this.isSubordinate = true;
        this.referralData = await this.referralService.getReferralData(query.subordinate_id);
        this.invitationLink += this.referralData.code;
        this.fetchingReferrals = false;
      }
    })
  }

  init(): void {
    this.fetchingReferrals = true;
  }

  moveBack() {
    this.location.back();
  }

}
