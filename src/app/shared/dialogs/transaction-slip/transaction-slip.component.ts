import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DetailedPaymentDataModel } from '../../interface/shared-interface';
import { TransactionsService } from '../../services/transactions/transactions.service';

@Component({
  selector: 'app-transaction-slip',
  templateUrl: './transaction-slip.component.html',
  styleUrls: ['./transaction-slip.component.scss']
})
export class TransactionSlipComponent implements OnInit {
  data: any
  transactionDetail: DetailedPaymentDataModel = new DetailedPaymentDataModel();
  fetchingTransactionDetail = true;
  constructor(
    private ref: MatDialogRef<TransactionSlipComponent>,
    private transactionsService: TransactionsService,
    @Inject(MAT_DIALOG_DATA) data: any
  ) {
    this.data = data;
   }

  ngOnInit(): void {
    this.fetchingTransactionDetail = true;
    this.transactionsService.fetchTransactionDetail(this.data.transaction_id).then(result => {
      this.fetchingTransactionDetail = false;
      this.transactionDetail = result;
    })
  }

}
