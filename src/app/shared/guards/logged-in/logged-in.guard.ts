import { Inject, Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthGuard } from '../auth/auth.guard';

@Injectable({
  providedIn: 'root'
})
export class LoggedInGuard implements CanActivate {
  constructor(
    private authGuard: AuthGuard,
    private router: Router,
    private route: ActivatedRoute,
    @Inject('AUTH_KEY_PROPERTY_NAME') private authKey: string
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (sessionStorage.getItem(this.authKey) || localStorage.getItem(this.authKey)) {
        return false;
      } else {
        return true;
      }
  }
  
}
