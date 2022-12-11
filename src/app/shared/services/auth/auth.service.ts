import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { IAuthCredential, IAuthResult } from '../../interface/shared-interface';
import { retry, catchError, map } from 'rxjs/operators';
import { Observable, ObservableInput } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authUrl: string;
  private headers = new Headers({
    'Content-Type': 'application/x-www-form-urlencoded'
  })

  private authToken: string
  constructor(
    private http: HttpClient,
    @Inject('AUTH_KEY_PROPERTY_NAME') key: string,
    @Inject('AUTH_ENDPOINT') authEndpoint: string
  ) {
    this.authToken = key;
    this.authUrl = authEndpoint;
   }
  
  async validateAuthToken(payload: IAuthCredential): Promise<IAuthResult> {
    let response: IAuthResult = {authenticated: false};
    await this.http.post(this.authUrl, payload).toPromise().then( res => {
      response = res as IAuthResult;
    }).catch((e: HttpErrorResponse) => {
      response = {
        authenticated: false,
        reason: e.error.message
      }
    });

    return response;
  }

  async authenticate(payload: IAuthCredential): Promise<IAuthResult> {
    let response: IAuthResult = {authenticated: false};

    // let body = new URLSearchParams();
    // body.set('username', payload.login as string);
    // body.set('password', payload.password as string)
    
    
    await this.http.post(this.authUrl, `username=${payload.login}&password=${payload.password}`, {headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }}).toPromise().then((res : any) => {
      // authenticated
      if(res.access_token) {
        if(payload.remember == "true") {
          localStorage.setItem(this.authToken, res.access_token);
        } else {
          sessionStorage.setItem(this.authToken, res.access_token);
          localStorage.setItem(this.authToken, res.access_token);
        }
      }
      response = {authenticated: true};
    }).catch((e: HttpErrorResponse) => {
      response = {
        authenticated: false,
        reason: 'Incorrect phone or password'
      }
    });
    return response;

  }

}
