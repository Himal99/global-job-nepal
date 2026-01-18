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
    const api = `http://46.62.241.168:8085/api/v1/auth/register`;

    return this.http.post(api, body);
  }

  public login(body: object): Observable<any> {
    const api = `http://46.62.241.168:8085/api/v1/auth/login`;

    return this.http.post(api, body);
  }

}
