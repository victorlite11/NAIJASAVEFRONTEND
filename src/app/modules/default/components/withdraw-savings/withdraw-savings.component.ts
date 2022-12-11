import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { BankDetails } from 'src/app/shared/models/contributor-model/contributor-model';
import { WithdrawalService } from 'src/app/shared/services/withdrawal/withdrawal.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-withdraw-savings',
  templateUrl: './withdraw-savings.component.html',
  styleUrls: ['./withdraw-savings.component.scss']
})
export class WithdrawSavingsComponent implements OnInit {

  // for error alert
  feedback = "";
  type : "error" | "success" = "success";

  updatable = false;
  withdrawing = false;
  balance = "0";
  title = "Withdraw Savings";

  form = new FormGroup({
    withdraw: new FormControl(0, [Validators.required, Validators.min(10)]),
    accountNumber: new FormControl(''),
    accountName: new FormControl(''),
    bankName: new FormControl(''),
    purpose: new FormControl('OtherTransactions', Validators.required),
    statement: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required)
  });

  readableDate = new Date(this.form.value.date).toDateString();

  private contributor_id = "";
  private overseer_id = "";

  constructor(
    private withdrawalService: WithdrawalService,
    private route: ActivatedRoute,
    private location: Location
    ) {}

  
  ngOnInit(): void {
    this.updatable = true;
    this.route.queryParams.subscribe(async query => {
      this.balance = query.balance
      this.contributor_id = query.contributor_id;
      this.overseer_id = query.overseer_id;

    this.form.setValue({
      date: new Date().toLocaleDateString(),
      withdraw: 100,
      name: query.name,
      purpose: "OtherTransactions",
      bankName: query.bankName,
      accountName: query.accountName,
      accountNumber: query.accountNumber,
      statement: `${query.name} Withdrawal Request`
    });

    this.reconstructDate()
    })
  }

  reconstructDate() {
    this.readableDate = new Date(this.form.value.date).toDateString();
  }

  close() {
    return false;
  }

  withdraw() {
    this.withdrawing = true;

    this.withdrawalService.sendWithdrawalRequest({
      statement: this.form.value.statement,
      amount: this.form.value.withdraw,
      withdrawerName: this.form.value.name,
      requester_id: this.contributor_id,
      overseer_id: this.overseer_id,
      purpose: this.form.value.purpose,
      date: new Date(this.form.value.date).toISOString(),
      bankDetails: {
        bankName: this.form.value.bankName,
        accountNumber: this.form.value.accountNumber,
        name: this.form.value.accountName
      }
    }).then(response => {
      this.withdrawing = false;

      if (response.success) {
        this.feedback = response.message;
        this.type = "success";
      } else {
        this.feedback = response.message;
        this.type = "error";
      }

      setTimeout(() => {
        this.feedback = ""
      }, 5100)
      return false;
    })
  }

}
