import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContributorModel } from 'src/app/shared/models/contributor-model/contributor-model';
import { ContributorsService } from 'src/app/shared/services/contributors/contributors.service';
import {Location} from "@angular/common";

@Component({
  selector: 'app-commission',
  templateUrl: './commission.component.html',
  styleUrls: ['./commission.component.scss']
})
export class CommissionComponent implements OnInit {
  contributor : ContributorModel = new ContributorModel()

  constructor(
    private contributorsService: ContributorsService,
    private route : ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.init()
  }

  async init() {
    this.route.queryParams.subscribe(async query => {
      this.contributor = await this.contributorsService.getContributor(query.contributor_id);
    })
  }

  moveBack() {
    this.location.back();
  }

}
