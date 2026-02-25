import { Injectable } from '@angular/core';
import {BaseService} from "../../../core/BaseService";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ApiUtils} from "../../../core/ApiUtils";

@Injectable({
  providedIn: 'root',
})
export class AuthService extends BaseService<any> {
  static API = 'v1/auth';

  constructor(protected override http: HttpClient) {
    super(http);
  }

  protected getApi(): string {
    return AuthService.API;
  }

  public registerUser(body: object): Observable<any> {
    const api = `https://rotation-cheese-advertise-beverly.trycloudflare.com/api/v1/auth/register`;

    return this.http.post(api, body);
  }

  public login(body: object): Observable<any> {
    const api = `https://rotation-cheese-advertise-beverly.trycloudflare.com/api/v1/auth/login`;

    return this.http.post(api, body);
  }

}
