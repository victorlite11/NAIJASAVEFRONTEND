import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActivitiesModel } from 'src/app/shared/models/contributor-model/contributor-model';
import { ActivitiesService } from 'src/app/shared/services/activities/activities.service';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.scss']
})
export class ActivitiesComponent implements OnInit {
  activities: ActivitiesModel = new ActivitiesModel();
  fetchingActivities = true;
  title = "Activities Log";
  name = "Total Actions Performed"
  constructor(
    private activitiesService: ActivitiesService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.fetchingActivities = true;
    this.route.queryParams.subscribe(async query => {
      if(!query.subordinate_id) {
        this.route.data.subscribe(async data => {
          this.activities = await this.activitiesService.getActivities(data.contributor_id);
          this.activities.approvalDate = new Date(this.activities.approvalDate).toDateString();
          this.activities.regDate = new Date(this.activities.regDate).toDateString();
          this.activities.actions.forEach(a => {
            a.date = new Date(a.date).toDateString();
          })
          this.fetchingActivities = false;
        })
      } else {
        this.activities = await this.activitiesService.getActivities(query.subordinate_id);
          this.activities.approvalDate = new Date(this.activities.approvalDate).toDateString();
          this.activities.regDate = new Date(this.activities.regDate).toDateString();
          this.activities.actions.forEach(a => {
            a.date = new Date(a.date).toDateString();
          })
          this.fetchingActivities = false;
      }
    })
  }

}
