
export class ContributorModel {
    _id?: string;
    basicInformation?: BasicInformationModel = new BasicInformationModel();
    credentials?: CredentialsModel = new CredentialsModel();
    location?: LocationModel = new LocationModel();
    account?: AccountModel = new AccountModel();
    activities?: ActivitiesModel = new ActivitiesModel();
    referral?: ReferralModel = new ReferralModel();
    privilege?: PrivilegeModel = new PrivilegeModel();
    identity?: IdentityModel = new IdentityModel();
    paymentTicks?: PaymentTicksModel = new PaymentTicksModel();
}
 
export class BasicInformationModel {
    name: string = "";
    age: number = 0;
    gender: "" | "male" | "female" = "";
    dateOfBirth: string = "";
    nextOfKin: string = "";
    overseerId: string = "";
    referralCode: string = "";
}

export class CredentialsModel {
    phoneNumber: string = "";
    username: string = "";
    email: string = "";
    password: string = "";
}

export class LocationModel {
    country: string = "";
    state: string = "";
    localGovernment: string = "";
    address: string = "";
}

export class AccountModel {
    balance: number = 0;
    dailySavings: number = 100;
    commission : CommissionAccount = new CommissionAccount();
    bankDetails?: BankDetails = new BankDetails();
}

export class CommissionAccount {
    balance : number = 0
}

export class BankDetails {
    name: string = "";
    accountNumber: string = "";
    bankName: string = "";
}

export class ActivitiesModel {
    status: "" | "active" | "inactive" = "";
    lastLogin: string = "";
    regDate: string = "";
    approvalDate: string = "";
    actions: Array<ActionModel> = [];
}
 
export class ActionModel {
    description: string = "";
    data?: any = {};
    date: string = "";
    type?: {
        is: "DailySavings" | "OtherTransaction" | "AccountRegistration" | "AccountApproval" | "AccountRemoval";
        subType?: "Debit" | "Credit"
    }
}

export class ReferralModel {
    balance: number = 0;
    code : string = "";
}

export class PrivilegeModel {
    canWithdraw?: boolean = false;
    canDeposit?: boolean = false;
    canMakeWithdrawalRequest?: boolean = false;
    canMakeDepositRequest?: boolean = false;
    canWithdrawSubordinates?: boolean = false;
    canDepositSubordinates?: boolean = false;
    canUseSMS?: boolean = false;
    canRejectSubordinatesRequests?: boolean = false;
    canWithdrawWhileImmature?: boolean = false;
    canWithdrawSubordinatesWithoutChecks?: boolean = false;
    canOpenAccountForSubordinates?: boolean = false;
    canChangeDailyDeposit?: boolean = false;
    canDepositAnyAmount?: boolean = false;
}

export class IdentityModel {
    isSuperContributor?: boolean = false;
    isSubContributor?: boolean = false;
    isContributor?: boolean = false;
    wasContributor?: boolean = false; // used to change back to original identity from isSuper & isSub
    isInvestor?: boolean = false;
    wasInvestor?: boolean = false; // used to change back to original identity from isSuper & isSub
}

export class PaymentTicksModel {
    id: number = 0;
    yearlyTicks: Array<YearlyTicksModel> = [];
}

export class YearlyTicksModel {
    id: number = 0;
    monthlyTicks: Array<MonthlyTicksModel> = [];
}

export class MonthlyTicksModel {
    id: number = 0; // month of year (number)
    name: string = ""; // day of the month (string)
    dailyTicks: Array<DailyTicksModel> = [];
}

export class DailyTicksModel {
    id: number = 0; // day of the month (number)
    name: string = ""; // day of the month (string)
    transaction_id: string = ""; // the id poiting to the transaction the tick represents  
}

export class BasicContributorDto {
    _id?: string = "";
    name: string = "";
    phoneNumber: string = "";
    imageUrl?: string = "";
    status?: "active" | "inactive" | "" = "active";
}

export class ContributorAccountSummary {
    totalDeposit: number = 0;
    totalWithdrawn: number = 0;
    balance: number = 0;
}
