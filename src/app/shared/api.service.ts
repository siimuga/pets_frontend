import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {AllPets} from "../all-pets/module/all-pets";

import {MyPets} from "../my-pets/module/my-pets";
import {Login} from "../login-create/module/login";
import {Create} from "../login-create/module/create";
import {AllUsers} from "../all-users/module/all-users";
import {Selections} from "../selections/module/selections";
import {Types} from "./types";
import {FurColor} from "./fur-color";
import {Countries} from "./countries";
import {PetRequest} from "./petrequest";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private BASE_URL = "http://localhost:8080/api";
  private MANAGE_PET_URL = `${this.BASE_URL}/pet`;
  private SELECTION_URL = `${this.BASE_URL}/selection`;
  private LOGIN_URL = `${this.BASE_URL}/login`;
  private REGISTER_URL = `${this.BASE_URL}/register`;
  private SORT_PETS_URL = `${this.BASE_URL}/pets/sort`;
  private ALL_USERS_URL = `${this.BASE_URL}/users`;
  private SORT_MY_PETS_URL = `${this.BASE_URL}/mypets/sort`;
  private ALL_TYPES_URL = `${this.BASE_URL}/type`;
  private ALL_FURS_URL = `${this.BASE_URL}/furcolor`;
  private ALL_COUNTRIES_URL = `${this.BASE_URL}/country`;
  private NEW_CODE_URL = `${this.BASE_URL}/code`;

  constructor(private http: HttpClient) {
  }

  getNewCode(userId: number): Observable<any>{
    let queryParams = new HttpParams();
    queryParams = queryParams.append("userId",userId);
    return this.http.get<any>(this.NEW_CODE_URL,{params:queryParams});
  }

  sortAllPets(sort:string): Observable<AllPets[]>{
    let queryParams = new HttpParams();
    queryParams = queryParams.append("sort",sort);
    return this.http.get<AllPets[]>(this.SORT_PETS_URL,{params:queryParams});
  }

  findAllUsers(): Observable<AllUsers[]>{
    return this.http.get<AllUsers[]>(this.ALL_USERS_URL);
  }

  findAllTypes(): Observable<Types[]>{
    return this.http.get<Types[]>(this.ALL_TYPES_URL);
  }

  findAllFurColors(): Observable<FurColor[]>{
    return this.http.get<FurColor[]>(this.ALL_FURS_URL);
  }

  findAllCountries(): Observable<Countries[]>{
    return this.http.get<Countries[]>(this.ALL_COUNTRIES_URL);
  }

  sendRequest(feedback: PetRequest): Observable<any> {
    return this.http.post(this.MANAGE_PET_URL, feedback);
  }

  addSelections(feedback: Selections): Observable<any> {
    return this.http.post(this.SELECTION_URL, feedback);
  }

  onLogIn(feedback: Login): Observable<any> {
    return this.http.post(this.LOGIN_URL, feedback);
  }

  onCreate(feedback: Create): Observable<any> {
    return this.http.post(this.REGISTER_URL, feedback);
  }

  sendUpdateRequest(feedback: PetRequest): Observable<any> {
    return this.http.patch(this.MANAGE_PET_URL, feedback);
  }

  sortMyPets(userId:number, sort:string): Observable<MyPets[]>{
    let queryParams = new HttpParams();
    queryParams = queryParams.append("userId",userId).append("sort",sort);
    return this.http.get<MyPets[]>(this.SORT_MY_PETS_URL,{params:queryParams});
  }

  deletePet(petId:number): Observable<any> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("petId",petId);
    return this.http.delete(this.MANAGE_PET_URL,{params:queryParams});
  }
}
