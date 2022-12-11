import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BasicContributorModel, OperationFeedback, SubordinatesRequest } from '../../interface/shared-interface';
import { ContributorModel } from '../../models/contributor-model/contributor-model';

@Injectable({
  providedIn: 'root'
})
export class SubordinatesService {
  private subordinatesEndpoint: string
  constructor(
    private http: HttpClient,
    @Inject('SUBORDINATES_ENDPOINT') subordinatesEndpoint: string
  ) {
    this.subordinatesEndpoint = subordinatesEndpoint;
  }

  async fetchSubordinates(request: SubordinatesRequest): Promise<ContributorModel[] | number | BasicContributorModel[]> {
    let url = this.subordinatesEndpoint + `/${request.contributor_id}`
    
    // type
    if(request.identity) {
      if(url.includes('?')) {
        url += `&identity=${request.identity}`;
      } else {
        url += `?identity=${request.identity}`;
      }
    }

    // assignable
    if(request.assignable) {
      if(url.includes('?')) {
        url += `&assignable=${request.assignable}`;
      } else {
        url += `?assignable=${request.assignable}`;
      }
      url += `&intended_new_overseer_id=${request.intended_new_overseer_id}`;
    }

    // count
    if(request.count) {
      if(url.includes('?')) {
        url += `&count=${request.count}`;
      } else {
        url += `?count=${request.count}`;
      }
    }

    return await this.http.get(url).toPromise().then(
      subordinates => {
        if(request.count) {
          return subordinates as number;
        } else if(request.assignable) {
          return subordinates as BasicContributorModel[];
        } else {
          return subordinates as Array<ContributorModel>;
        }
      }
    )
  }

  
  async fetchSubordinate(request: SubordinatesRequest): Promise<ContributorModel> {
    let url = this.subordinatesEndpoint + `/${request.contributor_id}`
    
    // type
    if(request.subordinate_id) {
      if(url.includes('?')) {
        url += `&identity=${request.subordinate_id}`;
      } else {
        url += `?identity=${request.subordinate_id}`;
      }
    }

    return await this.http.get(url).toPromise().then(
      subordinate => {
        return subordinate as ContributorModel;
      }
    )
  }

  async assignSubordinates(new_overseer_id: string, subordinates_id_list: string[]): Promise<OperationFeedback> {
    // assign_subordinates
    return await this.http.post(this.subordinatesEndpoint + `/assign_subordinates?new_overseer_id=${new_overseer_id}`, subordinates_id_list).toPromise().then(result => {
      return result as OperationFeedback;
    })
  }
}
