import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnnouncementCategory, AnnouncementModel } from 'src/app/shared/interface/shared-interface';
import { AnnouncementsService } from 'src/app/shared/services/announcements/announcements.service';
import { CompanyService } from 'src/app/shared/services/company/company.service';
import { ContributorsService } from 'src/app/shared/services/contributors/contributors.service';

@Component({
  selector: 'app-announcement',
  templateUrl: './announcement.component.html',
  styleUrls: ['./announcement.component.scss']
})
export class AnnouncementComponent implements OnInit {  
  // announcements
  fetchingAnnouncements = true;
  announcements: AnnouncementModel[] = [];
  title = "Announcements";
  name = "Total Announcements"
  
  constructor(
    private announcementsService: AnnouncementsService,
    private contributorsService: ContributorsService,
    private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
      this.init();
    }

  private async init() {
    this.fetchingAnnouncements = true;
    this.route.data.subscribe(async data => {
      let c = await this.contributorsService.getContributor(data.contributor_id);
      let category: AnnouncementCategory;
 
      if(c.identity?.isContributor) {
        category = {general: true, contributors: true}
      } else if(c.identity?.isInvestor) {
        category = {general: true, investors: true}
      } else if(c.identity?.isSubContributor) {
        category = {general: true, subContributors: true}
      } else {
        category = {general: true, superContributors: true}
      }

      await this.announcementsService.fetchPublicAnnouncements(category).then(announcements => {
        this.fetchingAnnouncements = false;
        announcements.forEach(a => {
          a.date = new Date(a.date as string).toDateString();
        });
        this.announcements = announcements;
      })
    })
  }


}
