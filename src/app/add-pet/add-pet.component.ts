import {Component, OnInit} from '@angular/core';
import {ApiService} from "../shared/api.service";
import {Types} from "./module/types";
import {FurColor} from "./module/fur-color";
import {Countries} from "./module/countries";

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
    country: ''
  };
  types: Types[]=[];
  furColors: FurColor[]=[];
  countries: Countries[]=[];

  constructor(private apiService:ApiService) {
  }

  ngOnInit() {
    this.findAllTypes()
    this.findAllFurColors()
    this.findAllCountries()
  }

  sendRequest(): void {
      this.apiService.sendRequest(this.model).subscribe(
        res=>{
          location.reload();
        },
        err=>{alert("An error has occured")}
      )
  }

  public findAllTypes() {
    this.apiService.findAllTypes().subscribe(
      res=>{
        this.types = res;
      },
      err=> {
        alert("An error has occured")
      }
    )
  }

  public findAllFurColors() {
    this.apiService.findAllFurColors().subscribe(
      res=>{
        this.furColors = res;
      },
      err=> {
        alert("An error has occured")
      }
    )
  }

  public findAllCountries() {
    this.apiService.findAllCountries().subscribe(
      res=>{
        this.countries = res;
      },
      err=> {
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
