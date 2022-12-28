import {Component, OnInit} from '@angular/core';
import {ApiService} from "../shared/api.service";
import {Router} from "@angular/router";
import {PetRequest} from "../shared/petrequest";
import {Countries} from "../shared/countries";
import {Types} from "../shared/types";
import {FurColor} from "../shared/fur-color";

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
    userId: 0

  };
  types: Types[] = [];
  furColors: FurColor[] = [];
  countries: Countries[] = [];
  userName:string=''

  constructor(private apiService: ApiService,
              private router: Router) {
  }

  ngOnInit() {
    this.model.userId = Number(sessionStorage.getItem('userId'));
    this.userName = String(sessionStorage.getItem("userName"));
    this.getNewCode()
    this.findAllTypes()
    this.findAllFurColors()
    this.findAllCountries()
  }

  onLogOut() {
    sessionStorage.removeItem("userId");
    sessionStorage.removeItem("userName");
    this.router.navigate(['/']);
  }

  goMyPets() {
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

  public getNewCode() {
    this.apiService.getNewCode(this.model.userId).subscribe(
      res => {
        this.model.code = res;
      },
      err => {
        alert(err.error.detail)
      }
    )
  }

  sendRequest(): void {
    if (this.model.type == "" || this.model.furColor == "" || this.model.country == "") {
      return;
    } else {
      this.apiService.sendRequest(this.model).subscribe(
        res => {
          this.goMyPets()
        },
        err => {
          alert(err.error.detail)
        }
      );
    }
  }

  public findAllTypes() {
    this.apiService.findAllTypes().subscribe(
      res => {
        this.types = res;
      },
      err => {
        alert(err.error.detail)
      }
    )
  }

  public findAllFurColors() {
    this.apiService.findAllFurColors().subscribe(
      res => {
        this.furColors = res;
      },
      err => {
        alert(err.error.detail)
      }
    )
  }

  public findAllCountries() {
    this.apiService.findAllCountries().subscribe(
      res => {
        this.countries = res;
      },
      err => {
        alert(err.error.detail)
      }
    )
  }
}
