import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { SignupRequestModel } from '../../models/signup-request-model/signup-request-model';

@Injectable({
  providedIn: 'root'
})
export class SignupService {
  private signupEndpoint: string;
  constructor(
    private http: HttpClient,
    @Inject('SIGNUP_REQUEST_ENDPOINT') signupRequestEndpoint: string
  ) {
    this.signupEndpoint = signupRequestEndpoint;
  }

  async sendSignupRequest(request: SignupRequestModel): Promise<{success: boolean, msg: string}> {
    return await this.http.post(this.signupEndpoint, request).toPromise().then(r => {
      return {success: true, msg: "Signup request sent for approval"}
    }).catch((e: HttpErrorResponse )=> {
      return {success: false, msg: e.error.message}
    });
  }
}
