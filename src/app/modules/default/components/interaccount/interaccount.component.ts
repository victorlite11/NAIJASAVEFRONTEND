import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatRadioButton, MatRadioChange } from '@angular/material/radio';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchComponent } from 'src/app/shared/dialogs/search/search.component';
import { SearchSelection } from 'src/app/shared/interface/shared-interface';
import { ContributorModel } from 'src/app/shared/models/contributor-model/contributor-model';
import { ContributorsService } from 'src/app/shared/services/contributors/contributors.service';
import { PaymentService } from 'src/app/shared/services/payment/payment.service';
import { SubordinatesService } from 'src/app/shared/services/subordinates/subordinates.service';

import Swal from 'sweetalert2';

interface Users {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-interaccount',
  templateUrl: './interaccount.component.html',
  styleUrls: ['./interaccount.component.scss']
})

export class InteraccountComponent implements OnInit {

  // for error alert
  feedback = "";
  type : "error" | "success" = "success";


  users: Users[] = [];
  usersLoading = false;
  phone: string = '';
  title = "Interaccount"
  performingTransaction = false;
  contributor = new ContributorModel();
  selectedUser = "No contributor selected";


  form: FormGroup = new FormGroup({
    selectedUser: new FormControl(null,Validators.required),
    enteredAmount: new FormControl(null,Validators.required),
    transactionDate: new FormControl(new Date().toLocaleDateString(),Validators.required),
    sendSmsNotification: new FormControl(false),
    statement: new FormControl(null),
    purpose: new FormControl("DailySavings",Validators.required)
  })

  readableDate = new Date(this.form.value.transactionDate).toDateString()
  availableBalance = '-';
  constructor(
    private subordinatesService: SubordinatesService,
    private contributorsService: ContributorsService,
    private paymentService: PaymentService,
    private router: Router,
    @Inject('SEARCH_SELECTION_KEY') private searchSelectionKey : string,
    private dialog: MatDialog,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.init();
  }

  async init() {
    this.route.data.subscribe(async data => {
      this.contributor = await this.contributorsService.getContributor(data.contributor_id);
      this.availableBalance = `${this.contributor.account?.balance}`;
    })

    this.reconstructDate()

    if (sessionStorage.getItem(this.searchSelectionKey)) {
      let searchSelection : SearchSelection = JSON.parse(sessionStorage.getItem(this.searchSelectionKey)!!)
      this.selectedUser = `${searchSelection.name}`;

      this.form.setValue({
        selectedUser: searchSelection.contributorId,
        enteredAmount: null,
        transactionDate: new Date().toLocaleDateString(),
        statement: null,
        sendSmsNotification: false,
        purpose: "DailySavings"
      });

      sessionStorage.removeItem(this.searchSelectionKey);
      this.reconstructDate();
    }
  }

  reconstructDate() {
    this.readableDate = new Date(this.form.value.transactionDate).toDateString();
  }

  onChange(mrChange: MatRadioChange) {
    this.usersLoading = true;
    this.users = [];

    this.route.data.subscribe(async data => {
      await this.subordinatesService.fetchSubordinates({
        contributor_id: data.contributor_id,
        identity: mrChange.value
      }).then(subordinates => {
        this.usersLoading = false;
        (<ContributorModel[]>subordinates).forEach(subordinate => {
          this.users.push({
            value: subordinate._id as string,
            viewValue:`${subordinate.basicInformation!!.name}(${subordinate.credentials!!.phoneNumber})`
          });
        });
      });
    });
 }

 openSearchPortal() {
  this.router.navigate(['search-portal'],{relativeTo: this.route.parent, queryParams : {
    destination : "interaccount"
  }});
}

 
 async debit() {

  this.route.data.subscribe(async data => {
    this.performingTransaction = true;
    await this.paymentService.debit({
      from: this.form.value.selectedUser,
      to: data.contributor_id,
      date: this.form.value.transactionDate,
      amount: this.form.value.enteredAmount,
      purpose: this.form.value.purpose,
      statement: this.form.value.statement,
      method: 'CASH',
      send_sms_notification: this.form.value.sendSmsNotification
    }).then(async response => {
      this.performingTransaction = false;
      if (response.success) {
        this.feedback = response.message;
        this.type = "success";

        await this.contributorsService.getContributor(data.contributor_id).then(c => {
          this.availableBalance = `${c.account!!.balance}`;
        })
      } else {
        this.feedback = response.message;
        this.type = "error";
      }

      setTimeout(() => {
        this.feedback = ""
      }, 5100)
    })
  })

 }

 credit() {
  this.route.data.subscribe(async data => {
    this.performingTransaction = true;
    await this.paymentService.credit({
      from: data.contributor_id,
      to: this.form.value.selectedUser,
      date: this.form.value.transactionDate,
      amount: this.form.value.enteredAmount,
      purpose: this.form.value.purpose,
      statement: this.form.value.statement,
      method: 'CASH',
      send_sms_notification: this.form.value.sendSmsNotification
    }).then(async response => {
      this.performingTransaction = false;
      if (response.success) {
        this.feedback = response.message;
        this.type = "success";

        await this.contributorsService.getContributor(data.contributor_id).then(c => {
          this.availableBalance = `${c.account!!.balance}`;
        })
      } else {
        this.feedback = response.message;
        this.type = "error";
      }

      setTimeout(() => {
        this.feedback = ""
      }, 5100)
    })
  })
 }

}
