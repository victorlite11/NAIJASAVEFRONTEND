export class PaymentModel {
    _id?: string;
    amount: number = 0;
    from: string = "";
    to: string = "";
    statement?: string;
    date?: string;
    method: "ONLINE" | "CASH" = "CASH";
    check?: boolean;
    purpose: "DailySavings" | "OtherTransactions" = "OtherTransactions";
    send_sms_notification?: boolean = false;
}
 