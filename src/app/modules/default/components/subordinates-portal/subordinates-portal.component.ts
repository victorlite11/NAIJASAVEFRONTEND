import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ContributorModel } from 'src/app/shared/models/contributor-model/contributor-model';
import { CompanyService } from 'src/app/shared/services/company/company.service';
import { ContributorsService } from 'src/app/shared/services/contributors/contributors.service';
import { SubordinatesService } from 'src/app/shared/services/subordinates/subordinates.service';

@Component({
  selector: 'app-subordinates-portal',
  templateUrl: './subordinates-portal.component.html',
  styleUrls: ['./subordinates-portal.component.scss']
})
export class SubordinatesPortalComponent implements OnInit {
  title = "Subordinates";
  name = "Total Subordinates";

  totalSubordinates = 0;
  subContributorsCount = 0;
  contributorsCount = 0;
  investorsCount = 0;

  countingSubordinates = true;
  contributor = new ContributorModel()

  overseer?: ContributorModel;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private contributorsService: ContributorsService,
    private subordinatesService: SubordinatesService,
  ) { }

  ngOnInit(): void {
      this.route.queryParams.subscribe(async query => {
        if(!query.subordinate_id) {
          this.route.data.subscribe(
            async data => {
              this.contributor = await this.contributorsService.getContributor(data.contributor_id);
    
              // count number of subordinates
              await this.countSubordinates();
            }
          )
        } else {
          this.contributor = await this.contributorsService.getContributor(query.subordinate_id);
          // count number of subordinates
          await this.countSubordinates();
          this.route.data.subscribe(
            async data => {
              this.overseer = await this.contributorsService.getContributor(data.contributor_id);
    
            }
          )
        }
      })
  }

  async countSubordinates() {
    this.countingSubordinates = true;
    if(this.contributor.identity?.isSuperContributor || this.contributor.identity?.isSubContributor) {
      this.contributorsCount = await this.subordinatesService.fetchSubordinates({
        contributor_id: this.contributor._id as string,
        count: true,
        identity: "contributors"
      }) as number;
      this.investorsCount = await this.subordinatesService.fetchSubordinates({
        contributor_id: this.contributor._id as string,
        count: true,
        identity: "investors"
      }) as number;
      this.subContributorsCount = await this.subordinatesService.fetchSubordinates({
        contributor_id: this.contributor._id as string,
        count: true,
        identity: "sub-contributors"
      }) as number;
    }
    this.totalSubordinates = this.contributorsCount + this.investorsCount + this.subContributorsCount;
    this.countingSubordinates = false;
  }

  openSubContributors() {
    this.navigateToSubordinates("sub-contributors");
  }

  openContributors() {
    this.navigateToSubordinates("contributors");
  }

  openInvestors() {
    this.navigateToSubordinates("investors");
  }
 
  navigateToSubordinates(identity: "sub-contributors" | "contributors" | "investors") {
    this.router.navigate(['subordinates'],{relativeTo: this.route.parent, queryParams: {contributor_id: this.contributor._id, identity: identity}});
  
  }

  navigateToAssignSubordinatesPortal() {
    this.route.queryParams.subscribe(async query => {
      this.router.navigate(['assign-subordinates'],{relativeTo: this.route.parent, queryParams: {subordinate_id: query.subordinate_id}});
    })
  }

  addContributor() {
    this.route.data.subscribe(async data => {
      this.router.navigate(['new-contributor'], {relativeTo: this.route.parent, queryParams: {
        contributor_id: data.contributor_id}
      });
    })
  }

  openSearchPortal() {
    this.router.navigate(['search-portal'],{relativeTo: this.route.parent});
  }

}
