import {Component, OnInit} from '@angular/core';
import {ApiService} from "../shared/api.service";
import {Router} from "@angular/router";
import {EditService} from "../shared/edit.service";
import {PetRequest} from "../shared/petrequest";
import {Types} from "../shared/types";
import {FurColor} from "../shared/fur-color";
import {Countries} from "../shared/countries";

@Component({
  selector: 'app-edit-pet',
  templateUrl: './edit-pet.component.html',
  styleUrls: ['./edit-pet.component.css']
})
export class EditPetComponent implements OnInit {
  model: PetRequest = {
    name: '',
    code: '',
    type: '',
    furColor: '',
    country: '',
    userId:0
  };
  types: Types[] = [];
  furColors: FurColor[] = [];
  countries: Countries[] = [];
  userName:string=''

  constructor(private apiService: ApiService,
              private editService: EditService,
              private router: Router) {
  }

  ngOnInit() {
    this.model = this.editService.pet;
    this.model.userId=Number(sessionStorage.getItem('userId'))
    this.userName = String(sessionStorage.getItem("userName"));
    this.findAllTypes()
    this.findAllFurColors()
    this.findAllCountries()
  }

  onLogOut() {
    sessionStorage.removeItem("userId");
    sessionStorage.removeItem("userName");
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

  sendUpdateRequest(): void {
    this.apiService.sendUpdateRequest(this.model).subscribe(
      res => {
        this.goMyPets()
      },
      err => {
        alert("An error occurred")
      }
    )
  }

  public findAllTypes() {
    this.apiService.findAllTypes().subscribe(
      res => {
        this.types = res;
      },
      err => {
        alert("An error occurred")
      }
    )
  }

  public findAllFurColors() {
    this.apiService.findAllFurColors().subscribe(
      res => {
        this.furColors = res;
      },
      err => {
        alert("An error occurred")
      }
    )
  }

  public findAllCountries() {
    this.apiService.findAllCountries().subscribe(
      res => {
        this.countries = res;
      },
      err => {
        alert("An error occurred")
      }
    )
  }
}
