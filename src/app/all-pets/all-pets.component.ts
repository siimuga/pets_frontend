import {Component, OnInit} from '@angular/core';
import {AllPets} from "./module/all-pets";
import {ApiService} from "../shared/api.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-all-pets',
  templateUrl: './all-pets.component.html',
  styleUrls: ['./all-pets.component.css']
})
export class AllPetsComponent implements OnInit{
  pets: AllPets[]=[]

  constructor(private apiService:ApiService,
              private router: Router) {
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

  editPet(pet:any) {
    this.router.navigate(['/editpet'],pet);
  }
}
