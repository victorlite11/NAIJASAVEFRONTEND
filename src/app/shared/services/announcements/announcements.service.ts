import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { AnnouncementModel, AnnouncementCategory } from '../../interface/shared-interface';

@Injectable({
  providedIn: 'root'
})
export class AnnouncementsService {
  private announcementsEndpoint: string;
  constructor(
    private http: HttpClient,
    @Inject('ANNOUNCEMENTS_ENDPOINT') announcementsEndpoint: string
  ) {
    this.announcementsEndpoint = announcementsEndpoint;
   }

   async fetchPublicAnnouncements(categories: AnnouncementCategory): Promise<AnnouncementModel[]> {
    return await this.http.post(this.announcementsEndpoint + `/fetch-announcements`, categories).toPromise().then(r => {
      return r as AnnouncementModel[];
    })
  }
}
