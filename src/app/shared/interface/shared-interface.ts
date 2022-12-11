import { BankDetails, BasicContributorDto } from "../models/contributor-model/contributor-model";

export class IAuthCredential {
    login?: string;
    password?: string;
    auth_token?: string;
    remember?: "true" | "false"
}

export class IAuthResult {
    authenticated: boolean = false;
    authToken?: string;
    for?: string;
    reason?: string;
}

export class DepositRequest {
    _id?: string;
    statement: string = "";
    amount: number = 0;
    date: string = "";
    purpose: "DailySavings" = "DailySavings";
    depositorName: string = "";
    requester_id: string = "";
    overseer_id: string = "";
    send_sms_notification?: boolean = false;
}

export class WithdrawalRequest {
    _id?: string;
    statement: string = "";
    amount: number = 0;
    date: string = "";
    purpose: "DailySavings" = "DailySavings";
    withdrawerName: string = "";
    bankDetails: BankDetails = new BankDetails();
    overseer_id: string = ""
    requester_id: string = "";
    send_sms_notification?: boolean = false;
}

export class SubordinatesRequest {
    contributor_id: string = "";
    count?: boolean = false;
    assignable?: boolean = false; // assignable and intended_new_overseer_id goes together
    intended_new_overseer_id?: string = "" // used to determine the assignable subordinates to return
    subordinate_id?: string = "";
    identity?: "investors" | "contributors" | "sub-contributors" = "contributors";
}

export class AnnouncementModel {
    _id?: string;
    title: string = "";
    body: string = "";
    date?: string = "";
    auther?: string = "";
    category: AnnouncementCategory = new AnnouncementCategory()
}

export class AnnouncementCategory {
    general?: boolean = true;
    admins?: boolean = false;
    investors?: boolean = false;
    contributors?: boolean = false;
    subContributors?: boolean = false;
    superContributors?: boolean = false;
}

export class BasicContributorModel {
    _id?: string;
    name: string = "";
    phoneNumber: string = "";
    imageUrl?: string = "";
    status: "active" | "inactive" | "" = "inactive";
}

export class BasicTransactionModel {
    statement: string = "";
    amount: number = 0;
    _id: string = "";
    date: string = ""
}

export class SearchSelection {
    contributorId : string = "";
    phoneNumber : string = "";
    name: string = "";
}

export interface Destination {
    destination : "conversation" | "profile" | "interaccount";
}

export class DetailedPaymentDataModel {
    purpose: string = "";
    statement: string = "";
    date: string = "";
    time: string = "";
    amount: number = 0;
    payer: string = ""; // name (account type)
    receiver: string = ""; // name (account type)
    payerPhoneNumber: string = "";
    receiverPhoneNumber: string = "";
}

export class OperationFeedback {
    success: boolean = false;
    message: string = "Not Successful";
    data?: any;
}

export class PasswordResetData {
    phoneNumber : string = "";
    verificationCode : string = "";
    newPassword : string = "";
    requestDate : string = "";
}

export class ReferralData {
    balance: number = 0;
    code: string = "";
    referred: BasicContributorDto[] = []
}

