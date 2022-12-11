import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyService, ICompany } from 'src/app/shared/services/company/company.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  tradingBalance = 0;
  compData: ICompany;
  previousLoginId: string = '';
  newLoginId: string = '';
  previousPassword: string = '';
  newPassword: string = '';

  constructor(
    private compService: CompanyService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.compData = this.compService.defaultCompanyObject;
  }

  ngOnInit(): void {
      this.init();
  }
  init(): void {
  }

}
