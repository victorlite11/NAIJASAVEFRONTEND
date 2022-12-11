import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OperationFeedback, WithdrawalRequest } from '../../interface/shared-interface';

@Injectable({
  providedIn: 'root'
})
export class WithdrawalService {
  private withdrawalRequestEndpoint: string;
  private requestEndpoint: string;
  constructor(
    private http: HttpClient,
    @Inject('WITHDRAWAL_REQUEST_ENDPOINT') withdrawalRequestEndpoint: string,
    @Inject('REQUEST_ENDPOINT') requestEndpoint: string
  ) { 
    this.withdrawalRequestEndpoint = withdrawalRequestEndpoint;
    this.requestEndpoint = requestEndpoint;
  }

  async sendWithdrawalRequest(request: WithdrawalRequest): Promise<{success: boolean, message: string}> {
    
    return await this.http.post(this.withdrawalRequestEndpoint, request).toPromise().then(
      _ => {
        return {success: true, message: "Withdrawal request placed successfully"}
      }
    ).catch((e: HttpErrorResponse) => {
      return {success: false, message: e.error.message}
    })
  }

  async fetchWithdrawalRequests(overseer_id: string): Promise<WithdrawalRequest[]> {
    
    return await this.http.get(this.withdrawalRequestEndpoint + `?overseer_id=${overseer_id}`).toPromise().then(
      result => {
        return result as WithdrawalRequest[];
      }
    )
  }

  fetchAndObserveWithdrawalRequests(overseer_id: string): Observable<WithdrawalRequest[]> {
    return this.http.get(this.withdrawalRequestEndpoint + `?overseer_id=${overseer_id}`) as Observable<WithdrawalRequest[]>;
  }

  async removeRequest(request_id: string) {
    return this.http.delete(this.withdrawalRequestEndpoint + `?request_id=${request_id}`).toPromise().then(r =>
      console.log(r)
      ).catch((e: HttpErrorResponse) => {
        throw e.error.message
      })
  }

  async forwardWithdrawalRequestToOverseer(request_id: string, overseer_id: string): Promise<OperationFeedback> {
    return this.http.get(
      this.requestEndpoint + `/forward-withdrawal-request-to-overseer?request_id=${request_id}&overseer_id=${overseer_id}`
    ).toPromise().then(response => {
      return response as OperationFeedback;
    })
  }
}

