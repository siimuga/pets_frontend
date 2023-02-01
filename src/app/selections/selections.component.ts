import {Component, OnInit} from '@angular/core';
import {ApiService} from "../shared/api.service";
import {Types} from "../shared/types";
import {FurColor} from "../shared/fur-color";
import {Countries} from "../shared/countries";
import {Router} from "@angular/router";
import {Selections} from "./module/selections";

@Component({
  selector: 'app-add-pet',
  templateUrl: './selections.component.html',
  styleUrls: ['./selections.component.css']
})
export class SelectionsComponent implements OnInit {
  model: Selections = {
    type: '',
    furColor: '',
    country: '',
  };

  types: Types[] = [];
  furColors: FurColor[] = [];
  countries: Countries[] = [];

  constructor(private apiService: ApiService,
              private router: Router) {
  }

  ngOnInit() {
    this.findAllTypes()
    this.findAllFurColors()
    this.findAllCountries()
  }

  onLogOut() {
    sessionStorage.removeItem("userId");
    this.router.navigate(['/']);
  }


  addSelections(): void {
    if (this.model.type == "" && this.model.furColor == "" && this.model.country == "") {
      alert("Please fill the interested fields")
    } else {
      this.apiService.addSelections(this.model).subscribe(
        res => {
          alert("Data successfully added")
          location.reload()
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
