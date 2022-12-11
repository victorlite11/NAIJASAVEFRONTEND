import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DepositRequest } from '../../interface/shared-interface';
import { DepositService } from '../../services/deposit/deposit.service';
import { PaymentService } from '../../services/payment/payment.service';

import Swal from 'sweetalert2';
import { ContributorsService } from '../../services/contributors/contributors.service';
import { ContributorModel } from '../../models/contributor-model/contributor-model';
 
@Component({
  selector: 'app-shared-component-depositrequests',
  templateUrl: './depositrequests.component.html',
  styleUrls: ['./depositrequests.component.scss']
})
export class DepositrequestsComponent implements OnInit {
  // db
  fetchingRequests = true;
  approving = false;
  contributor = new ContributorModel()
  depositRequests: DepositRequest[] = [];
  title = "Deposit Requests"
  name = "Total Deposit Requests"

  // for error alert
  feedback = "";
  type : "error" | "success" = "success";
  
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private depositService: DepositService,
    private contributorsService: ContributorsService,
    private paymentService: PaymentService
  ) { }

  ngOnInit(): void {
    this.init()
  }

  init(): void {
    this.route.data.subscribe(async data => {
      this.contributor = await this.contributorsService.getContributor(data.contributor_id);
      this.depositService.fetchAndObserveDepositRequests(data.contributor_id).subscribe(requests => {
        requests.forEach(r => {
          r.date = new Date(r.date).toDateString()
        });
        this.depositRequests = requests;
        this.fetchingRequests = false;
      });
    });
  }

  async approve(requester_id: string) {
    this.approving = true;
    this.route.data.subscribe(async data => {
      let request = this.depositRequests.filter(r => r.requester_id == requester_id)[0];

      await this.paymentService.credit({
        _id: request._id,
        amount: request.amount,
        date: request.date,
        from: data.contributor_id,
        to: request.requester_id,
        method: 'CASH',
        statement: request.statement,
        purpose: request.purpose,
        send_sms_notification: request.send_sms_notification
      }).then( response => {
        this.approving = false;
        if (response.success) {
          this.feedback = response.message;
          this.type = "success";
          this.init()
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

  async reject(request_id: string) {
    await this.depositService.removeDepositRequest(request_id).catch(
      emessage => {
        this.feedback = emessage;
        this.type = "error";
  
        setTimeout(() => {
          this.feedback = ""
        }, 5100)
      })
    this.init(); // fetch the requests again
  }

  async forwardToOverseer(request_id: string) {
    this.approving = true;
    this.route.data.subscribe(async data => {
      let c = await this.contributorsService.getContributor(data.contributor_id);

      await this.depositService.forwardDepositRequestToOverseer(
        request_id,
        c.basicInformation!!.overseerId
      ).then(response => {
        this.approving = false;
        if (response.success) {
          this.feedback = response.message;
          this.type = "success";
          this.init();
        } else {
          this.feedback = response.message;
          this.type = "error";
        }
  
        setTimeout(() => {
          this.feedback = ""
        }, 5100)

      });
    });
  }

}
