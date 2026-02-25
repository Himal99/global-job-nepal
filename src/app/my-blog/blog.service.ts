import { Injectable } from '@angular/core';
import {BaseService} from "../core/BaseService";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ApiUtils} from "../core/ApiUtils";

@Injectable({
  providedIn: 'root',
})
export class BlogService extends BaseService<any>{
  static API = 'api/v1/my-blog';

  constructor(protected override http: HttpClient) {
    super(http);
  }
  protected getApi(): string {
    return BlogService.API;
  }

  public post(data: any): Observable<any> {
    const api = `${this.getApi()}`;
    const req = ApiUtils.getRequest(api);
    return this.http.post(req.url,data, {headers: req.header});
  }

}
