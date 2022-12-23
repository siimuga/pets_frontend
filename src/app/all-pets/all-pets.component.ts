import {Component, OnInit} from '@angular/core';
import {AllPets} from "./module/all-pets";
import {ApiService} from "../shared/api.service";

@Component({
  selector: 'app-all-pets',
  templateUrl: './all-pets.component.html',
  styleUrls: ['./all-pets.component.css']
})
export class AllPetsComponent implements OnInit{
  pets: AllPets[]=[]

  constructor(private apiService:ApiService) {
  }

  ngOnInit() {
    this.findAllPets();
  }

  public findAllPets() {
    this.apiService.findAllPets().subscribe(
      res=>{
        this.pets = res;
      },
      err=> {
        alert("An error has occured")
      }
    )
  }

  editPet() {

  }
}
