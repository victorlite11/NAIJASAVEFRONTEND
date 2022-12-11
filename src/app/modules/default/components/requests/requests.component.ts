import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DepositService } from 'src/app/shared/services/deposit/deposit.service';
import { WithdrawalService } from 'src/app/shared/services/withdrawal/withdrawal.service';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss']
})
export class RequestsComponent implements OnInit {
  depositRequests = 0;
  totalRequests = 0;
  withdrawalRequests = 0;
  title = "Requests";
  name = "Total Requests"

  countingRequests = true;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private depositService: DepositService,
    private withdrawalService: WithdrawalService
  ) { }

  ngOnInit(): void {
    this.countingRequests = true;
    this.route.data.subscribe(async data => {
      this.depositService.fetchAndObserveDepositRequests(data.contributor_id).subscribe( requests => {
        this.depositRequests = requests.length;
        this.totalRequests += requests.length;
      });

      await this.withdrawalService.fetchAndObserveWithdrawalRequests(data.contributor_id).subscribe( requests => {
        this.withdrawalRequests = requests.length;
        this.totalRequests += requests.length;
        this.countingRequests = false;
      })
    });
  }

  openWithdrawalRequests() {
    this.router.navigateByUrl('/withdrawalrequests')
  }

  openDepositRequests() {
    this.router.navigateByUrl('/depositrequests');
  }

}
