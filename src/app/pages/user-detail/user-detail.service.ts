import { Injectable } from '@angular/core';
import {BaseService} from "../../core/BaseService";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ApiUtils} from "../../core/ApiUtils";


@Injectable({
  providedIn: 'root',
})
export class UserDetailService extends BaseService<any> {
  static API = 'api/v1/auth';

  constructor(protected override http: HttpClient) {
    super(http);
  }

  protected getApi(): string {
  return UserDetailService.API;
}

  public updateDetail(data: any): Observable<any> {
    const api = `${this.getApi()}/update-profile`;
    const req = ApiUtils.getRequest(api);
    return this.http.post(req.url,data, {headers: req.header});
  }

  public getByEmail(email: any): Observable<any> {
    const api = `${this.getApi()}/by-email?email=${email}`;
    const req = ApiUtils.getRequest(api);
    return this.http.get(req.url, {headers: req.header});
  }

  public updateDetailSection(body: any,email:string,section:string): Observable<any> {
    const api = `${this.getApi()}/update/${section}?email=${email}`;
    const req = ApiUtils.getRequest(api);
    return this.http.post(req.url,body, {headers: req.header});
  }
}
