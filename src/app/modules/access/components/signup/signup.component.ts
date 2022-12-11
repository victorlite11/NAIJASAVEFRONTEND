import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Location } from "@angular/common";

import { ActivatedRoute, Router } from '@angular/router';
import { SignupService } from 'src/app/shared/services/signup/signup.service';
import { SignupRequestModel } from 'src/app/shared/models/signup-request-model/signup-request-model';

import Swa from 'sweetalert2';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
}) 

export class SignupComponent implements OnInit {
  signingUp = false;
  navigated = true;

  // for error alert
  feedback = "";
  type : "error" | "success" = "success";

  referralFormGroup: FormGroup = new FormGroup({
    referrerPhoneNumber: new FormControl('')
  })

  firstFormGroup: FormGroup = new FormGroup({
    phoneNumber: new FormControl('', [Validators.required, Validators.minLength(11)]),
    username: new FormControl(''),
    password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    email: new FormControl(""),
    accountType: new FormControl("contributor", Validators.required)
  })
 
  secondFormGroup: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    dateOfBirth: new FormControl('', Validators.required),
    nextOfKin: new FormControl('', Validators.required),
    gender: new FormControl('male')
  })

  identityFormGroup: FormGroup = new FormGroup({
    nationality: new FormControl('', Validators.required),
    address: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    state: new FormControl('', Validators.required),
    localGovernment: new FormControl(null, Validators.required)
  })

  savingsFormGroup: FormGroup = new FormGroup({
    dailySavings: new FormControl(100, [Validators.required, Validators.min(100)])
  })

  // contains the form fields
  signupRequestData = new SignupRequestModel();

  constructor(
    private router: Router,
    private location: Location,
    private route: ActivatedRoute,
    private signupService: SignupService
  ) { }

  moveBack() {
    this.location.back();
  }

  nextFormOne() {
      this.signupRequestData.phoneNumber = this.firstFormGroup.value["phoneNumber"];
      this.signupRequestData.password = this.firstFormGroup.value["password"];
      this.signupRequestData.username = this.firstFormGroup.value["username"];
      this.signupRequestData.accountType = this.firstFormGroup.value["accountType"];
      this.signupRequestData.email = this.firstFormGroup.value["email"];
  }
  nextFormTwo() {
      this.signupRequestData.name = this.secondFormGroup.value["name"];
      this.signupRequestData.dateOfBirth = this.secondFormGroup.value["dateOfBirth"];
      this.signupRequestData.gender = this.secondFormGroup.value["gender"];
      this.signupRequestData.nextOfKin = this.secondFormGroup.value["nextOfKin"];
  }
  nextFormIdentity() {
      this.signupRequestData.country = this.identityFormGroup.value["nationality"];
      this.signupRequestData.address = this.identityFormGroup.value["address"];
      this.signupRequestData.state = this.identityFormGroup.value["state"];
      this.signupRequestData.localGovernment = this.identityFormGroup.value["localGovernment"];
  }

  nextFormSavings() {
      this.signupRequestData.dailySavings = this.savingsFormGroup.value["dailySavings"];  
  }

  openTerms() {
    this.router.navigate(['../termsandconditions'], {relativeTo: this.route});
  }

  async signup() {
    this.nextFormOne()
    this.nextFormTwo();
    this.nextFormIdentity();
    this.nextFormSavings();

  
    // add final fields
    this.signingUp = true;
    this.signupRequestData.referrer = this.referralFormGroup.value.referrerPhoneNumber;
    
    await this.signupService.sendSignupRequest(this.signupRequestData).then((r: {success: boolean, msg: string}) => {
      this.signingUp = false;

      if (r.success) {
        this.feedback = r.msg;
        this.type = "success";
        this.firstFormGroup.reset()
        this.secondFormGroup.reset()
        this.identityFormGroup.reset()
        this.savingsFormGroup.reset()
      } else {
        this.feedback = r.msg;
        this.type = "error";
      }

      setTimeout(() => {
        this.feedback = ""
      }, 5100)

    })

  }
  
  ngOnInit(): void {
    this.route.queryParamMap.subscribe(q => {
      this.referralFormGroup.setValue({referrerPhoneNumber: q.get("invitation_code")})
    })
  }


}
