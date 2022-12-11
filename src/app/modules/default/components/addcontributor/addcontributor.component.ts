import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SignupRequestModel } from 'src/app/shared/models/signup-request-model/signup-request-model';
import { SignupService } from 'src/app/shared/services/signup/signup.service';
import { Location } from '@angular/common'

import Swal from 'sweetalert2';



@Component({
  selector: 'app-addcontributor',
  templateUrl: './addcontributor.component.html',
  styleUrls: ['./addcontributor.component.scss']
})
export class AddcontributorComponent implements OnInit {
  form: FormGroup = new FormGroup({
    phoneNumber: new FormControl('', [Validators.required, Validators.minLength(11)]),
    email: new FormControl(''),
    name: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    gender: new FormControl('male', Validators.required),
    dateOfBirth: new FormControl('', Validators.required),
    nextOfKin: new FormControl('', Validators.required),
    nationality: new FormControl('', Validators.required),
    state: new FormControl('', Validators.required),
    localGovernment: new FormControl('', Validators.required),
    accountType: new FormControl('contributor', Validators.required),
    referrer: new FormControl(''),
    dailySavings: new FormControl(100, Validators.required),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  signupRequest = new SignupRequestModel();
  adding = false;

  // for error alert
  feedback = "";
  type : "error" | "success" = "success";

  constructor(
    private signupService: SignupService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
    ) {}
    
  ngOnInit(): void {
    this.route.queryParams.subscribe(data => {
      this.form.value.accountType = data.identity
    })
  }
 
  async submit() {
    this.adding = true;
    this.route.queryParams.subscribe(async data => {
      this.signupRequest.accountType = this.form.value.accountType;
      this.signupRequest.address = this.form.value.address;
      this.signupRequest.dailySavings = this.form.value.dailySavings;
      this.signupRequest.dateOfBirth = this.form.value.dateOfBirth;
      this.signupRequest.email = this.form.value.email;
      this.signupRequest.gender = this.form.value.gender;
      this.signupRequest.country = this.form.value.nationality;
      this.signupRequest.localGovernment = this.form.value.localGovernment;
      this.signupRequest.name = this.form.value.name;
      this.signupRequest.nextOfKin = this.form.value.nextOfKin;
      this.signupRequest.overseerId = data.contributor_id || sessionStorage.getItem('qajgsdg');
      this.signupRequest.password = this.form.value.password;
      this.signupRequest.phoneNumber = this.form.value.phoneNumber;
      this.signupRequest.referrer = this.form.value.referrer;
      this.signupRequest.regDate = new Date().toISOString();
      this.signupRequest.state = this.form.value.state;

      await this.signupService.sendSignupRequest(this.signupRequest).then((r: {success: boolean, msg: string}) => {
        this.adding = false;

        if (r.success) {
          this.feedback = r.msg;
          this.type = "success";
          this.form.reset()
        } else {
          this.feedback = r.msg;
          this.type = "error";
        }
  
        setTimeout(() => {
          this.feedback = ""
        }, 5100)
      })
    })
    return false;
  }
}
