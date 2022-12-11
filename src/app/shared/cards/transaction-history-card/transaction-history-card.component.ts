import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { TransactionSlipComponent } from '../../dialogs/transaction-slip/transaction-slip.component';

@Component({
  selector: 'app-transaction-history-card',
  templateUrl: './transaction-history-card.component.html',
  styleUrls: ['./transaction-history-card.component.scss']
})
export class TransactionHistoryCardComponent implements OnInit {
  @Input() _id?: string;
  @Input() amount?: number;
  @Input() statement?: string;
  @Input() date?: string;
  constructor(
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
  }

  showTransactionSlip(transactionId: string) {
    const config = new MatDialogConfig();
    config.disableClose = false;
    config.autoFocus = true;
    config.height = '36em';
    config.width = '29em';
    config.data = {transaction_id: transactionId};
    this.dialog.open(TransactionSlipComponent, config);
  }

}
