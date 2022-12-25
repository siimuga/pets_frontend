import {Component, OnInit} from '@angular/core';
import {MyPets} from "./module/my-pets";
import {ApiService} from "../shared/api.service";
import {Router} from "@angular/router";
import {EditService} from "../shared/edit.service";

@Component({
  selector: 'app-my-pets',
  templateUrl: './my-pets.component.html',
  styleUrls: ['./my-pets.component.css']
})
export class MyPetsComponent implements OnInit{
  userId: number = Number(sessionStorage.getItem("userId"));
  pets: MyPets[]=[]

  constructor(private apiService:ApiService,
              private editService: EditService,
              private router: Router) {
  }

  ngOnInit() {
    this.findAllMyPets();
  }

  public findAllMyPets() {
    this.apiService.findAllMyPets(this.userId).subscribe(
      res=>{
        this.pets = res;
      },
      err=> {
        alert("An error has occured")
      }
    )
  }

  onLogOut() {
    sessionStorage.removeItem("userId");
    this.router.navigate(['/']);
  }

  editPet(pet:any) {
    this.editService.pet = pet;
    this.router.navigate(['/editpet']);
  }

  deletePet(pet:any):void{
    if(window.confirm('Are sure you want to delete this item ?')){
      this.apiService.deletePet(pet.id).subscribe(
        res => {
          location.reload()
        },
        err => {
          alert("An error has occured")
        }
      )
    }
  }
}
