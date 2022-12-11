import { Inject, Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from "@angular/fire/database";
import { ContributorModel, PaymentTicksModel } from '../../models/contributor-model/contributor-model';
import { HttpClient } from '@angular/common/http';


export enum ACCOUNT_TYPE {
  ADMIN, NORMAL_CONTRIBUTOR, INVESTOR
}


@Injectable({
  providedIn: 'root'
})
export class ContributorsService {
  private nodeValue = "contributors";
  private contributorsEndpoint: string;
  constructor(
    private firebase: AngularFireDatabase,
    private http: HttpClient,
    @Inject('CONTRIBUTORS_ENDPOINT') contributorsEndpoint: string
  ) {
    this.contributorsEndpoint = contributorsEndpoint;
   }


  async getContributor(id: string): Promise<ContributorModel> {
    return await this.http.get(this.contributorsEndpoint + `/${id}`).toPromise().then(response => {
      return response as ContributorModel;
    });
  }

}
