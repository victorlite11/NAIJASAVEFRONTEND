import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { OperationFeedback } from '../../interface/shared-interface';
import { PaymentModel } from '../../models/payment/payment-model';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private paymentEndpoint: string
  constructor(
    private http: HttpClient,
    @Inject('PAYMENT_ENDPOINT') paymentEndpoint: string
  ) { 
    this.paymentEndpoint = paymentEndpoint;
  }

  async credit(paymentData: PaymentModel): Promise<OperationFeedback> {
    return await this.http.post(this.paymentEndpoint + "/credit", paymentData).toPromise().then(res => {
      let x = <OperationFeedback>res;
      return {success: x.success, message: x.message as string}
    }).catch((e: HttpErrorResponse) => {
      return {success: false, message: e.error.message}
    });
  }

  async debit(paymentData: PaymentModel): Promise<OperationFeedback> {
    paymentData.check = true;
    return await this.http.post(this.paymentEndpoint + "/debit", paymentData).toPromise().then(res => {
      let x = <OperationFeedback>res;
      return {success: x.success, message: x.message as string}
    }).catch((e: HttpErrorResponse) => {
      return {success: false, message: e.error.message}
    });
  }
}
