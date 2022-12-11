import { Inject, Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IAuthResult } from '../../interface/shared-interface';
import { AuthService } from '../../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    @Inject('AUTH_KEY_PROPERTY_NAME') private authKey: string
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      if (sessionStorage.getItem(this.authKey) || localStorage.getItem(this.authKey)) {
        return true;
      } else {
        this.router.navigate(['/home'], {
          relativeTo : this.route
        })
        return false;
      }

  }
}
