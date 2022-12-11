import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BasicContributorModel, ReferralData } from '../../interface/shared-interface';
import { ReferralModel } from '../../models/contributor-model/contributor-model';

@Injectable({
  providedIn: 'root'
})
export class ReferralService {
  private referralEndpoint: string;
  
  constructor(
    private http: HttpClient,
    @Inject('REFERRAL_ENDPOINT') referralEndpoint: string
  ) {
    this.referralEndpoint = referralEndpoint;
   }

  async getReferralData(contributor_id: string): Promise<ReferralData> {
    return await this.http.get(`${this.referralEndpoint}/referral-data?contributor_id=${contributor_id}`).toPromise().then(result => {
      return result as ReferralData;
    });
  }

}
