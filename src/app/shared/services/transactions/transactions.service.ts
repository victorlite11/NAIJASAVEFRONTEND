import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BasicTransactionModel, DetailedPaymentDataModel } from '../../interface/shared-interface';
import { ContributorAccountSummary } from '../../models/contributor-model/contributor-model';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {
  private transactionEndpoint: string
  constructor(
    private http: HttpClient,
    @Inject('TRANSACTION_ENDPOINT') transactionEndpoint: string
  ) { 
    this.transactionEndpoint = transactionEndpoint;
  }

  async fetchHistory(contributor_id: string): Promise<BasicTransactionModel[]> {
    return await this.http.get(this.transactionEndpoint + `/contributor-history?contributor_id=${contributor_id}`).toPromise().then( result => {
      return result as BasicTransactionModel[];
    })
  }

  async getContributorAcccountSummary(contributor_id: string): Promise<ContributorAccountSummary> {
    return await this.http.get(this.transactionEndpoint + `/contributor-account-summary?contributor_id=${contributor_id}`).toPromise().then( result => {
      return result as ContributorAccountSummary;
    })
  }

  async fetchTransactionDetail(payment_id: string): Promise<DetailedPaymentDataModel> {
    return await this.http.get(this.transactionEndpoint + `/transaction-details?payment_id=${payment_id}`).toPromise().then(result => {
      return result as DetailedPaymentDataModel;
    })
  }
}
