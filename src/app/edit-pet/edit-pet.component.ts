import {Component, OnInit} from '@angular/core';
import {ApiService} from "../shared/api.service";
import {Types} from "./module/types";
import {FurColor} from "./module/fur-color";
import {Countries} from "./module/countries";
import {Router} from "@angular/router";
import {EditService} from "../shared/edit.service";

@Component({
  selector: 'app-add-pet',
  templateUrl: './edit-pet.component.html',
  styleUrls: ['./edit-pet.component.css']
})
export class EditPetComponent implements OnInit {
  model: PetRequest = {
    name: '',
    code: '',
    type: '',
    furColor: '',
    country: ''
  };
  types: Types[] = [];
  furColors: FurColor[] = [];
  countries: Countries[] = [];

  constructor(private apiService: ApiService,
              private editService: EditService,
              private router: Router) {
  }

  ngOnInit() {
    this.model = this.editService.pet;
    this.findAllTypes()
    this.findAllFurColors()
    this.findAllCountries()
  }

  goAllPets(){
    this.router.navigate(['/allpets']);
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

  sendUpdateRequest(): void {
    this.apiService.sendUpdateRequest(this.model).subscribe(
      res => {
        this.goAllPets()
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
}
