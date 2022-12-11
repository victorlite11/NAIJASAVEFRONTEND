import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContributorModel } from 'src/app/shared/models/contributor-model/contributor-model';
import { CompanyService } from 'src/app/shared/services/company/company.service';
import { ContributorsService } from 'src/app/shared/services/contributors/contributors.service';

@Component({
  selector: 'app-personal-data',
  templateUrl: './personal-data.component.html',
  styleUrls: ['./personal-data.component.scss']
})
export class PersonalDataComponent implements OnInit {
  // contributor
  contributor = new ContributorModel();
  fetchingPersonalData = true;
  accountType: string = "unknown";

  title = "Personal Data";
  name = "Full Name";

  constructor(
    private contributorsService: ContributorsService,
    private compService: CompanyService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

   ngOnInit(): void {
    this.init();
  }
  init(): void {
    this.fetchingPersonalData = true;
    this.route.queryParams.subscribe(async query => {
      if(!query.subordinate_id) {
        this.route.data.subscribe(
          async data => {
            this.contributor = await this.contributorsService.getContributor(data.contributor_id);
            this.contributor!!.activities!!.approvalDate = new Date(this.contributor.activities!!.approvalDate).toDateString()
            this.contributor!!.activities!!.regDate = new Date(this.contributor.activities!!.regDate).toDateString()
            this.contributor!!.basicInformation!!.dateOfBirth = new Date(this.contributor.basicInformation!!.dateOfBirth).toDateString()
            this.fetchingPersonalData = false;
          }
        )
      } else {
        this.contributor = await this.contributorsService.getContributor(query.subordinate_id);
        this.contributor!!.activities!!.approvalDate = new Date(this.contributor.activities!!.approvalDate).toDateString()
        this.contributor!!.activities!!.regDate = new Date(this.contributor.activities!!.regDate).toDateString()
        this.contributor!!.basicInformation!!.dateOfBirth = new Date(this.contributor.basicInformation!!.dateOfBirth).toDateString()
        this.fetchingPersonalData = false;
      }
    })
  }
}

