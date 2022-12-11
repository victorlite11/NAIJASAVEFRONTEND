import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BankDetails } from '../../models/contributor-model/contributor-model';
import { WithdrawalService } from '../../services/withdrawal/withdrawal.service';

@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrls: ['./withdraw.component.scss']
}) 
export class WithdrawComponent implements OnInit {
  updatable = false;
  withdrawing = false;
  data: {
    contributor_id: string, 
    overseer_id: string,
    name: string,
    bankDetails: BankDetails
  }
  form = new FormGroup({
    withdraw: new FormControl(0, [Validators.required, Validators.min(10)]),
    accountNumber: new FormControl(''),
    accountName: new FormControl(''),
    bankName: new FormControl(''),
    purpose: new FormControl('DailySavings', Validators.required),
    statement: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required)
  });
  constructor(
    public dialogRef: MatDialogRef<WithdrawComponent>,
    private withdrawalService: WithdrawalService,
    @Inject(MAT_DIALOG_DATA) data: any
    ) { 
      this.data = data;
    }
 
  ngOnInit(): void {
    this.updatable = true;
    this.form.setValue({
      date: new Date(),
      withdraw: 100,
      name: this.data.name,
      purpose: "OtherTransactions",
      bankName: this.data.bankDetails.bankName,
      accountName: this.data.bankDetails.name,
      accountNumber: this.data.bankDetails.accountNumber,
      statement: `${this.data.name} Withdrawal Request`
    });
  }

  close() {
    this.dialogRef.close();
    return false;
  }

  withdraw() {
    this.withdrawing = true;

    this.withdrawalService.sendWithdrawalRequest({
      statement: this.form.value.statement,
      amount: this.form.value.withdraw,
      withdrawerName: this.form.value.name,
      requester_id: this.data.contributor_id,
      overseer_id: this.data.overseer_id,
      purpose: this.form.value.purpose,
      date: this.form.value.date.toISOString(),
      bankDetails: {
        bankName: this.form.value.bankName,
        accountNumber: this.form.value.accountNumber,
        name: this.form.value.accountName
      }
    }).then(response => {
      this.withdrawing = false;
      this.dialogRef.close(response);
      return false;
    })
  }

}
