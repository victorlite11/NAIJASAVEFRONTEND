import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { PasswordService } from '../../services/password/password.service';

@Injectable({
  providedIn: 'root'
})
export class HasResetPasswordVerificationCodeGuard implements CanActivate {

  constructor(
    private passwordService : PasswordService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.check()
  }

  async check() : Promise<boolean> {
    let passwordResetStringData = sessionStorage.getItem("password-reset-data");

    if (passwordResetStringData) {
      let passwordResetData = JSON.parse(passwordResetStringData) as {phoneNumber : string, verificationCode : string};

      return await this.passwordService.checkVerificationCode(passwordResetData.phoneNumber, passwordResetData.verificationCode).then(r => {
        if(r.success) {
          return true;
        } else {
          return false
        }
      })

    } else {
      return false
    }
  }
  
}
