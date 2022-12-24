import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {AllPets} from "../all-pets/module/all-pets";
import {PetRequest} from "../add-pet/add-pet.component";
import {Types} from "../add-pet/module/types";
import {FurColor} from "../add-pet/module/fur-color";
import {Countries} from "../add-pet/module/countries";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private BASE_URL = "http://localhost:8080/api";
  private ADD_OR_EDIT_PET_URL = `${this.BASE_URL}/pet`;
  private ALL_PETS_URL = `${this.BASE_URL}/pets`;
  private ALL_TYPES_URL = `${this.BASE_URL}/type`;
  private ALL_FURS_URL = `${this.BASE_URL}/furcolor`;
  private ALL_COUNTRIES_URL = `${this.BASE_URL}/country`;

  constructor(private http: HttpClient) {
  }

  findAllPets(): Observable<AllPets[]>{
    return this.http.get<AllPets[]>(this.ALL_PETS_URL);
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
    return this.http.post(this.ADD_OR_EDIT_PET_URL, feedback);
  }

  sendUpdateRequest(feedback: PetRequest): Observable<any> {
    return this.http.patch(this.ADD_OR_EDIT_PET_URL, feedback);
  }

}
