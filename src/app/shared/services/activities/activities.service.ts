import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { ActivitiesModel } from '../../models/contributor-model/contributor-model';

@Injectable({
  providedIn: 'root'
})
export class ActivitiesService {
  private endpoint: string
  constructor(
    @Inject('ACTIVITIES_ENDPOINT') endpoint: string,
    private http: HttpClient
  ) { 
    this.endpoint = endpoint;
  }

  async getActivities(contributor_id: string): Promise<ActivitiesModel> {
    return this.http.get(this.endpoint + `/personal_activities_data?contributor_id=${contributor_id}`).toPromise().then(result => {
      return result as ActivitiesModel
    })
  }
}
