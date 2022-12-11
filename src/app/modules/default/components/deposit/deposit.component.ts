import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BottomSheetData, BottomSheetSwitch } from 'src/app/shared/components/bottom-sheet/bottom-sheet.component';
import { ContributorModel } from 'src/app/shared/models/contributor-model/contributor-model';
import { ContributorsService } from 'src/app/shared/services/contributors/contributors.service';
import { DepositService } from '../../../../shared/services/deposit/deposit.service';

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.scss']
})
export class DepositComponent implements OnInit {
  updatable = false;
  data = {
    contributor_id : "",
    dailySavings : "",
    overseer_id : "",
    name : ""
  }

  @ViewChild('bottomSheet') bottomSheet: any;
  bottomSheetData : BottomSheetData = {
    heading: {text: "Please choose your preferred payment method", color: "#e0b557"},
    buttons: [
      {name: "Online", bgColor: '#f55f5f', onClick: ($ev) => this.depositOnline()},
      {name: "Cash", bgColor: 'rgb(130, 50, 205)', onClick: ($ev) => this.depositCash()}
    ]
  }

  // for error alert
  feedback = "";
  type : "error" | "success" = "success";

  contributor = new ContributorModel()

  form = new FormGroup({
    deposit: new FormControl(0, [Validators.required, Validators.min(10)]),
    name: new FormControl("", Validators.required),
    statement: new FormControl("", Validators.required),
    purpose: new FormControl("DailySavings", Validators.required),
    transactionDate: new FormControl("", Validators.required)
  });

  errorMessage = "";
  errorExists = false;
  depositing = false;
  readableDate = new Date(this.form.value.transactionDate).toDateString()
  constructor(
    private depositService: DepositService,
    private contributorsService: ContributorsService,
    private route : ActivatedRoute
    ) {}

  ngOnInit(): void {
    this.updatable = true;

    this.route.queryParams.subscribe(async query => {
      this.contributor = await this.contributorsService.getContributor(query.contributor_id);

      this.form.setValue({
        deposit: Number(this.contributor.account?.dailySavings),
        name: this.contributor.basicInformation?.name,
        purpose: "DailySavings",
        transactionDate: new Date().toLocaleDateString(),
        statement: `${this.contributor.basicInformation?.name} Daily Deposit`
      });

      this.reconstructDate()
    })
    
  }

  reconstructDate() {
    this.readableDate = new Date(this.form.value.transactionDate).toDateString();
  }

  deposit() {
    BottomSheetSwitch.ensue(this.bottomSheet);
  }

  depositCash() {
    this.depositing = true;
    BottomSheetSwitch.desue(this.bottomSheet);
    
    this.depositService.sendDepositRequest({
      statement: this.form.value.statement,
      amount: this.form.value.deposit,
      depositorName: this.form.value.name,
      purpose:this.form.value.purpose,
      requester_id: this.contributor._id!!,
      overseer_id: this.contributor.basicInformation!!.overseerId,
      date: new Date(this.form.value.transactionDate).toISOString()
    }).then(response => {
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


      this.depositing = false;
      return false;
    })
  }

  depositOnline() {
    BottomSheetSwitch.desue(this.bottomSheet);
    this.type = "success";
    this.feedback = 'This feature will be available soon'
    setTimeout(() => {
      this.feedback = ""
    }, 5100)
  }

}
