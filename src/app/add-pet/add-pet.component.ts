import {Component, OnInit} from '@angular/core';
import {ApiService} from "../shared/api.service";
import {Types} from "./module/types";
import {FurColor} from "./module/fur-color";
import {Countries} from "./module/countries";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-pet',
  templateUrl: './add-pet.component.html',
  styleUrls: ['./add-pet.component.css']
})
export class AddPetComponent implements OnInit {
  model: PetRequest = {
    name: '',
    code: '',
    type: '',
    furColor: '',
    country: '',
    userId:2

  };
  types: Types[] = [];
  furColors: FurColor[] = [];
  countries: Countries[] = [];

  constructor(private apiService: ApiService,
              private router: Router) {
  }

  ngOnInit() {
    this.model.userId = Number(sessionStorage.getItem('userId'));
    this.findAllTypes()
    this.findAllFurColors()
    this.findAllCountries()
  }

  onLogOut() {
    sessionStorage.removeItem("userId");
    this.router.navigate(['/']);
  }

  goMyPets(){
    this.router.navigate(['/mypets']);
  }

  onTypeChange(event: any) {
    this.model.type = event.target.value;
  }

  onFurChange(event: any) {
    this.model.furColor = event.target.value;
  }

  onCountryChange(event: any) {
    this.model.country = event.target.value;
  }

  sendRequest(): void {
    debugger
    this.apiService.sendRequest(this.model).subscribe(
      res => {
        this.goMyPets()
      },
      err => {
        alert("An error has occured")
      }
    )
  }

  public findAllTypes() {
    this.apiService.findAllTypes().subscribe(
      res => {
        this.types = res;
      },
      err => {
        alert("An error has occured")
      }
    )
  }

  public findAllFurColors() {
    this.apiService.findAllFurColors().subscribe(
      res => {
        this.furColors = res;
      },
      err => {
        alert("An error has occured")
      }
    )
  }

  public findAllCountries() {
    this.apiService.findAllCountries().subscribe(
      res => {
        this.countries = res;
      },
      err => {
        alert("An error has occured")
      }
    )
  }
}

export interface PetRequest {
  name: string;
  code: string;
  type: string;
  furColor: string;
  country: string;
  userId: number;
}
