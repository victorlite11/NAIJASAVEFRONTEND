import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DepositRequest, OperationFeedback } from '../../interface/shared-interface';

@Injectable({
  providedIn: 'root'
})
export class DepositService {
  private depositRequestEndpoint: string;
  private requestEndpoint: string;
  constructor(
    private http: HttpClient,
    @Inject('DEPOSIT_REQUEST_ENDPOINT') depositRequestEndpoint: string,
    @Inject('REQUEST_ENDPOINT') requestEndpoint: string
  ) {
    this.depositRequestEndpoint = depositRequestEndpoint;
    this.requestEndpoint = requestEndpoint;
   }

  async sendDepositRequest(request: DepositRequest): Promise<{success: boolean, message: string}> {
    
    return await this.http.post(this.depositRequestEndpoint, request).toPromise().then(
      _ => {
        return {success: true, message: "Deposit request placed successfully"}
      }
    ).catch((e: HttpErrorResponse) => {
      return {success: false, message: e.error.message}
    })
  }

  async fetchDepositRequests(overseer_id: string): Promise<DepositRequest[]> {
    
    return await this.http.get(this.depositRequestEndpoint + `?overseer_id=${overseer_id}`).toPromise().then(
      result => {
        return result as DepositRequest[];
      }
    )
  }

  fetchAndObserveDepositRequests(overseer_id: string): Observable<DepositRequest[]> {
    return this.http.get(this.depositRequestEndpoint + `?overseer_id=${overseer_id}`) as Observable<DepositRequest[]>;
  }

  async removeDepositRequest(request_id: string) {
    //.subscribe(d => console.log(d))
    return this.http.delete(this.depositRequestEndpoint + `?request_id=${request_id}`).toPromise().then(r =>
      console.log(r)
      ).catch((e: HttpErrorResponse) => {
        throw e.error.message
      })
  }

  async forwardDepositRequestToOverseer(request_id: string, overseer_id: string): Promise<OperationFeedback> {
    return this.http.get(
      this.requestEndpoint + `/forward-deposit-request-to-overseer?request_id=${request_id}&overseer_id=${overseer_id}`
    ).toPromise().then(response => {
      return response as OperationFeedback;
    })
  }
}
