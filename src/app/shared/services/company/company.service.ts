import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';

export interface ICompany {
  name: string;
  loginID: string;
  inactiveTolerance: string;
  depositChangeAbleDays: {
    from: string,
    to: string
  }
  password: string;
  account: ICompanyAccount;
  maturity: {
    days: string;
    amount: {
      use: boolean;
      value: string;
    }
  }
  referral: {
    amountPaidOut: string;
    totalReferrals: string;
    minimumWithdrawable: string;
    earningPerReferral: string;
  }
}

export interface ICompanyAccount {
  tradingBalance: string;
  adminBalance: string;
  availableTradingBalance: string;
  balance: string;
  usersBalance: string;
  totalDeposit: string;
  totalWithdrawal: string;
  history: ICompanyTransaction[]
}

export interface ICompanyTransaction {
  date: string;
  amount: string;
  name: string;
  type: "Deposit" | "Withdraw" | "Credit" | "Debit" | "Forfeit"; // Deposit or Withdraw
  statement: string;
}

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  companyKey = "bQauAXUiwqaBBaXrqua";
  companyDefaultLoginID = "aUbvqx";
  companyDefaultPassword = "xquIbAbQw";

  defaultCompanyObject: ICompany = {
    name: 'NaijaSave',
    depositChangeAbleDays: {
      from: '1',
      to: '5'
    },
    loginID: this.companyDefaultLoginID,
    password: this.companyDefaultPassword,
    inactiveTolerance: '10',
    maturity: {
      days: "18",
      amount: {
        use: false,
        value: "5000"
      }
    },
    referral: {
      amountPaidOut: "0",
      minimumWithdrawable: '4000',
      totalReferrals: '0',
      earningPerReferral: '50'
    },
    account: {
      tradingBalance: '0',
      availableTradingBalance: '0',
      balance: '0',
      adminBalance: '0',
      usersBalance: '0',
      totalDeposit: '0',
      totalWithdrawal: '0',
      history: [{
        name: "Company",
        date: new Date().toLocaleDateString(),
        statement: "Initial Opening",
        amount: '0',
        type: "Deposit"
      }]
    }
  }
  constructor(
    private firebase: AngularFireDatabase
  ) { }

  getCompanyData(): AngularFireObject<ICompany> {
    return this.firebase.object(`company/${this.companyKey}`);
  }

  setNewCompanyData(data: ICompany) {
    this.firebase.object(`company/${this.companyKey}`).set(data);
  }
}
