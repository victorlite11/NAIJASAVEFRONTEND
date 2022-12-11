export class SignupRequestModel {
    phoneNumber: string = "";
    email: string = "";
    username?: string;
    password: string = "";

    name: string = "";
    regDate: string = new Date().toISOString();
    age: number = 0;
    gender: "male" | "female" = "male";
    dateOfBirth: string = "";
    nextOfKin: string = "";

    country: string = "";
    state: string = "";
    localGovernment: string = "";
    address: string = "";

    referrer?: string;
    overseerId?: string;
    accountType: 'investor' | 'contributor' = "investor";
    dailySavings: number = 100;
}
