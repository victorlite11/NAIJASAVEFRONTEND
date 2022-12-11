import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { PrivilegeModel } from '../../models/contributor-model/contributor-model';

@Injectable({
  providedIn: 'root'
})
export class PrivilegeService {
  private endpoint: string;
  constructor(
    private http: HttpClient,
    @Inject('PRIVILEGE_ENDPOINT') endpoint: string
  ) { 
    this.endpoint = endpoint;
  }

  async fetchPrivilege(contributor_id: string): Promise<PrivilegeModel> {
    return this.http.get(this.endpoint + `/contributor_privilege?contributor_id=${contributor_id}`).toPromise().then(result => {
      return result as PrivilegeModel;
    })
  }

  async changePrivilege(contributor_id: string, modified_privilege_object: PrivilegeModel): Promise<{success: boolean, message: string}> {
    
    return this.http.post(this.endpoint + `/change_contributor_privilege?contributor_id=${contributor_id}`, modified_privilege_object).toPromise().then(result => {
      return result as {success: boolean, message: string};
    });

  }

}
