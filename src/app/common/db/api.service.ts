import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { IUserSignUpDetails, IUserLoginDetails, IAddPassDetails, IPassDetails } from '../ipass-details';
import { LocalStorageService } from 'angular-web-storage';

import { Observable} from 'rxjs';

const API_URL = environment.APIURL;

let headers = new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods' : 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers' : 'Content-Type, Accept, Authorization, X-Requested-With, Application'
  })


@Injectable()
export class ApiService {

  constructor(private http: HttpClient, private storage : LocalStorageService) {
  }

  HeaderDetails(){
    let header = headers.append('token', this.storage.get('user').token);
    return header;
  }

  UserSignUp(userDetails : IUserSignUpDetails): Observable<any> {
  	return this.http.post(API_URL + 'signup', userDetails);
  }

  UserLogin(userDetails : IUserLoginDetails): Observable<any> {
  	return this.http.post(API_URL + 'login', userDetails, { headers : headers });
  }

  GetPasswordList(): Observable<any> {
    return this.http.post(API_URL + 'list/password', { userId : this.storage.get('user').userId}, { headers : this.HeaderDetails() });
  }

  GetSocialTypeList() : Observable<any> {
    return this.http.post(API_URL + 'list/socialtype', { userId : this.storage.get('user').userId}, { headers : this.HeaderDetails() });
  }

  AddPassword(userDetails : IAddPassDetails) : Observable<any> {
    userDetails.userId = this.storage.get('user').userId;
    return this.http.post(API_URL + 'add/password', userDetails, { headers : this.HeaderDetails() });
  }

  GetPasswordDetails(id) : Observable<any> {
    return this.http.post(API_URL + 'get/details/' + id, { userId : this.storage.get('user').userId}, { headers : this.HeaderDetails() });
  }

  UpdatePasswordDetails(userDetails) : Observable<any> {
    userDetails.userId = this.storage.get('user').userId;
    return this.http.post(API_URL + 'update/password', userDetails, { headers : this.HeaderDetails() });

  }
} 