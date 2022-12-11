import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BasicContributorModel } from 'src/app/shared/interface/shared-interface';
import { SubordinatesService } from 'src/app/shared/services/subordinates/subordinates.service';

@Component({
  selector: 'app-add-subordinates-portal',
  templateUrl: './add-subordinates-portal.component.html',
  styleUrls: ['./add-subordinates-portal.component.scss']
})
export class AddSubordinatesPortalComponent implements OnInit {
  title = "Assign Subordinates";
  name = "Total Available Subordinates";
  fetchingAssignableSubordinates = true;
  assignableSubordinates: BasicContributorModel[] = [];
  assigningList: string[] = [];
  intendedOverseerId : string = "";
  constructor(
    private subordinatesService: SubordinatesService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.init();
  }

  async init() {
    this.fetchingAssignableSubordinates = true;
    this.route.queryParams.subscribe(async query => {
      this.route.data.subscribe(async data => {
        this.intendedOverseerId = query.subordinate_id;
        this.assignableSubordinates = await this.subordinatesService.fetchSubordinates({
          contributor_id: data.contributor_id as string,
          assignable: true,
          intended_new_overseer_id: query.subordinate_id
        }) as BasicContributorModel[];
  
        this.fetchingAssignableSubordinates = false;
      });
    })
  }

  addToAssigningList(id: string, mark: any) {
    mark.classList.toggle("d-none");
    if(this.assigningList.includes(id)) {
      this.assigningList = this.assigningList.filter(assigned => assigned !== id);
    } else {
      this.assigningList.push(id);
    }
  }

  async assignSelectedSubordinates() {

    await this.subordinatesService.assignSubordinates(this.intendedOverseerId, this.assigningList).then(result => {
      this.init();
    })
  }

}
