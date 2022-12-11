import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { SubordinatesRequest } from 'src/app/shared/interface/shared-interface';
import { ContributorModel } from 'src/app/shared/models/contributor-model/contributor-model';

import { SubordinatesService } from 'src/app/shared/services/subordinates/subordinates.service';

@Component({
  selector: 'app-depositors',
  templateUrl: './depositors.component.html',
  styleUrls: ['./depositors.component.scss']
})
export class DepositorsComponent implements OnInit {

  // fetch subordinates
  fetchingSubordinates = true;
  subordinates: ContributorModel[] = [];

  addButtonText: string = "";
  title: string = "Subordinates";
  name = `Total ${this.title}`;
  data: SubordinatesRequest = new SubordinatesRequest();

  constructor(
              private router: Router,
              private route: ActivatedRoute,
              private subordinateService: SubordinatesService) { } 

   ngOnInit(): void {
    this.init();
  }
  
  async init() {
    this.route.queryParams.subscribe(async query => {
      this.data.contributor_id = query.contributor_id;
      this.data.identity = query.identity;
  
      // construct add button text
      switch (this.data.identity) {
        case "contributors":
          this.addButtonText = "Add New Contributor";
          this.title = "Contributors";
          this.name = `Total ${this.title}`;
          break;
        case "investors":
          this.addButtonText = "Add New Investor"
          this.title = "Investors";
          this.name = `Total ${this.title}`;
          break;
        default:
          this.title = "Sub Contributors"
          this.name = `Total ${this.title}`;
          break;
      }
      
      this.fetchingSubordinates = true;
      await this.subordinateService.fetchSubordinates({
        contributor_id: this.data.contributor_id,
        identity: this.data.identity
      }).then( result => {
        this.fetchingSubordinates = false;
        this.subordinates = result as ContributorModel[];
      })
    })
  }

  ngAfterViewInit() {
  }

  addContributor() {
    this.router.navigate(['new-contributor'], {relativeTo: this.route.parent, queryParams: {identity: this.data.identity as string, contributor_id: this.data.contributor_id}});
  }

  openSearchPortal() {
    this.router.navigate(['search-portal'],{relativeTo: this.route.parent});
  }

}
