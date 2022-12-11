import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { TransactionSlipComponent } from 'src/app/shared/dialogs/transaction-slip/transaction-slip.component';
import { BasicTransactionModel } from 'src/app/shared/interface/shared-interface';
import { TransactionsService } from 'src/app/shared/services/transactions/transactions.service';

@Component({
  selector: 'app-transaction-history',
  templateUrl: './transaction-history.component.html',
  styleUrls: ['./transaction-history.component.scss']
})
export class TransactionHistoryComponent implements OnInit {
  title = "Transactions History";
  showingTable = true;
  viewToggleBtnText = "Display table"
  balance = 0;
  transactionsHistory: BasicTransactionModel[] = [];

  fetchingHistory = true;

  constructor(
    private route: ActivatedRoute,
    private transactionsService: TransactionsService,
    private dialog: MatDialog,
  ) { }

  toggleTableView() {
    this.showingTable = !this.showingTable;
    this.viewToggleBtnText = this.showingTable ? "Display cards" : "Display table"
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(query => {
      this.balance = query.balance;
    })

    let result: BasicTransactionModel[] = [];

    this.fetchingHistory = true;
    this.route.queryParams.subscribe(async query => {
      if(!query.subordinate_id) {
        this.route.data.subscribe(async data => {
          await this.transactionsService.fetchHistory(data.contributor_id).then(trxs => {
            trxs.forEach(h => {
              h.date = new Date(h.date).toDateString();
              result.push(h);
            });
            this.fetchingHistory = false
            this.transactionsHistory = result.reverse();
    
          })
        })
      } else {
        await this.transactionsService.fetchHistory(query.subordinate_id).then(trxs => {
          trxs.forEach(h => {
            h.date = new Date(h.date).toDateString();
            result.push(h);
          });
          this.fetchingHistory = false
          this.transactionsHistory = result.reverse();
  
        })
      }
    })
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
