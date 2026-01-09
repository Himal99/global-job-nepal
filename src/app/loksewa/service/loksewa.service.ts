import { Injectable } from '@angular/core';
import {BaseService} from "../../core/BaseService";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ApiUtils} from "../../core/ApiUtils";

@Injectable({
  providedIn: 'root',
})
export class LoksewaService extends BaseService<any> {
  static API = 'v1/api/loksewa';

  constructor(protected override http: HttpClient) {
    super(http);
  }

  protected getApi(): string {
  return LoksewaService.API;
}

  public getAllNotice(): Observable<any> {
    const api = `${this.getApi()}/notice`;
    const req = ApiUtils.getRequest(api);
    return this.http.get(req.url, {headers: req.header});
  }

}
