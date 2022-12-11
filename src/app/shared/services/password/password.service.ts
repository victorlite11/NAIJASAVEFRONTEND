import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { OperationFeedback, PasswordResetData } from '../../interface/shared-interface';

@Injectable({
  providedIn: 'root'
})
export class PasswordService {

  constructor(
    private http : HttpClient,
    @Inject('PASSWORD_RESET_ENDPOINT') private passwordResetEndpoint : string
  ) { }

  async getVerificationCode(phoneNumber : string) : Promise<OperationFeedback> {
    return await this.http.post(`${this.passwordResetEndpoint}/get-password-reset-verification-code`, {phoneNumber : phoneNumber}).toPromise().then( r => {
      return r as OperationFeedback
    }).catch( (e : HttpErrorResponse ) => {
      return {
        success : false,
        message : e.error.message
      }
    })
  }

  async checkVerificationCode(phoneNumber : string, verificationCode : string) : Promise<OperationFeedback> {
    return await this.http.post(`${this.passwordResetEndpoint}/check-password-reset-verification-code`, {
      phoneNumber : phoneNumber,
      verificationCode : verificationCode
    }).toPromise().then( r => {
      return r as OperationFeedback
    }).catch( (e : HttpErrorResponse ) => {
      return {success : false, message : e.error.message}
    })
  }

  async setNewPassword(payload : PasswordResetData) : Promise<OperationFeedback> {
    return await this.http.post(`${this.passwordResetEndpoint}/reset-password`, payload).toPromise().then( r => {
      return r as OperationFeedback
    }).catch( (e : HttpErrorResponse ) => {
      return {success : false, message : e.error.message}
    })    
  }
}
