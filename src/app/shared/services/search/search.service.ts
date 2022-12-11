import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { ContributorModel } from '../../models/contributor-model/contributor-model';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private subordinatesEndpoint: string
  constructor(
    private http: HttpClient,
    @Inject('SEARCH_SUBORDINATES_ENDPOINT') subordinatesEndpoint: string,
    @Inject('SEARCH_CONTRIBUTORS_UNIFIED_ENDPOINT') private searchContributorsUnifiedEndpoint: string
  ) {
    this.subordinatesEndpoint = subordinatesEndpoint;
  }
  
  async searchSubordinates(
    option: {overseer_id: string, use: "name" | "phone" | "email" | "location", search_keywords: string}
    ): Promise<ContributorModel[]> {
    let url = this.subordinatesEndpoint;

    if(option.overseer_id) {
      if(url.includes('?')) {
        url += `&overseer_id=${option.overseer_id}`;
      } else {
        url += `?overseer_id=${option.overseer_id}`;
      }
    }

    if(option.use) {
      if(url.includes('?')) {
        url += `&use=${option.use}`;
      } else {
        url += `?use=${option.use}`;
      }
    }

    url += `&search-keywords=${option.search_keywords}`;

    return this.http.get(url).toPromise().then( search_result => {
      return search_result as ContributorModel[];
    });
  }

  async searchContributorsUnified(overseer_id: string, search_keywords: string): Promise<ContributorModel[]> {
    return this.http.get(this.searchContributorsUnifiedEndpoint + `?overseer_id=${overseer_id}&search_keywords=${search_keywords}`).toPromise().then(resp => {
      return resp as ContributorModel[];
    })
  }
  
}
