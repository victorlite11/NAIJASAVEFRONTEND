import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { WithdrawalRequest } from '../../interface/shared-interface';
import { ContributorModel } from '../../models/contributor-model/contributor-model';
import { ContributorsService } from '../../services/contributors/contributors.service';
import { PaymentService } from '../../services/payment/payment.service';
import { WithdrawalService } from '../../services/withdrawal/withdrawal.service';

@Component({
  selector: 'app-shared-component-withdrawalrequests',
  templateUrl: './withdrawalrequests.component.html',
  styleUrls: ['./withdrawalrequests.component.scss']
})
export class WithdrawalrequestsComponent implements OnInit {
  // db
  fetchingRequests = true;
  withdrawalRequests: WithdrawalRequest[] = []
  contributor = new ContributorModel()

  // for error alert
  feedback = "";
  type : "error" | "success" = "success";


  name = "Total Withdrawal Requests"
  title = "Withdrawal Requests"
  approving = false;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private withdrawalService: WithdrawalService,
    private contributorsService: ContributorsService,
    private paymentService: PaymentService
  ) { }

  ngOnInit(): void {
    this.init();
  }

  init(): void {
    this.route.data.subscribe(async data => {
      this.contributor = await this.contributorsService.getContributor(data.contributor_id);
      this.withdrawalService.fetchAndObserveWithdrawalRequests(data.contributor_id).subscribe(requests => {
        requests.forEach(r => {
          r.date = new Date(r.date).toDateString();
        })
        this.withdrawalRequests = requests;
        this.fetchingRequests = false;
      });
    });
  }

  approve(requester_id: string) {
    this.approving = true;
    this.route.data.subscribe(async data => {
      let request = this.withdrawalRequests.filter(r => r.requester_id == requester_id)[0];

      await this.paymentService.debit({
        _id: request._id,
        amount: request.amount,
        date: request.date,
        from: request.requester_id,
        to: data.contributor_id,
        statement: request.statement,
        purpose: request.purpose,
        method: 'CASH',
        send_sms_notification: request.send_sms_notification
      }).then( response => {
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
      })

    })
  }

  async reject(request_id: string) {
    await this.withdrawalService.removeRequest(request_id).catch(
      emessage => {
        this.feedback = emessage;
        this.type = "error";

        setTimeout(() => {
          this.feedback = ""
        }, 5100)
      }
    );
    this.init(); // fetch the requests again
  }

  forwardToOverseer(request_id: string) {
    this.approving = true;
    this.route.data.subscribe(async data => {
      let c = await this.contributorsService.getContributor(data.contributor_id);

      await this.withdrawalService.forwardWithdrawalRequestToOverseer(
        request_id,
        c.basicInformation!!.overseerId
      ).then(result => {
        this.approving = false;
        if(result.success) {
          this.feedback = result.message;
          this.type = "success";
  
          setTimeout(() => {
            this.feedback = ""
          }, 5100)
          this.init(); // fetch the requests again
        }
      });
    });
  }
  
}
