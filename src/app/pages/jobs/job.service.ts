import { Injectable } from '@angular/core';
import {BaseService} from "../../core/BaseService";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {ApiUtils} from "../../core/ApiUtils";

@Injectable({
  providedIn: 'root',
})
export class JobService extends BaseService<any> {
  static API = 'v1/api/jobs';

  constructor(protected override http: HttpClient) {
    super(http);
  }

  protected getApi(): string {
  return JobService.API;
}


  public getAllJobsFromNepal(): Observable<any> {
    const api = `${this.getApi()}/nepal`;
    const req = ApiUtils.getRequest(api);
    return this.http.get(req.url, {headers: req.header});
  }

  public dumpJobs(): Observable<any> {
    const api = `${this.getApi()}/nepal/dump`;
    const req = ApiUtils.getRequest(api);
    return this.http.get(req.url, {headers: req.header});
  }

  getJobsList(filters: any, page: number, size: number = 10) {

    // Build query params
    const queryParams: string[] = [`page=${page}`, `size=${size}`];

    if (filters.keyword) queryParams.push(`search=${encodeURIComponent(filters.keyword)}`);
    if (filters.location) queryParams.push(`location=${encodeURIComponent(filters.location)}`);
    if (filters.jobType) queryParams.push(`jobType=${encodeURIComponent(filters.jobType)}`);
    if (filters.minSalary != null) queryParams.push(`minSalary=${filters.minSalary}`);
    if (filters.maxSalary != null) queryParams.push(`maxSalary=${filters.maxSalary}`);
    if (filters.isNew) queryParams.push(`isNew=true`);

    const api = `${this.getApi()}/nepal/list?${queryParams.join('&')}`;
    const req = ApiUtils.getRequest(api);
    return this.http.get<any>(req.url, { headers: req.header });
  }

}
