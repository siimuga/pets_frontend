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
  pets: MyPets[] = []
  sort:string='nameAsc'
  userName:string=''

  constructor(private apiService:ApiService,
              private editService: EditService,
              private router: Router) {
  }

  ngOnInit() {
    this.findAllMyPets();
    this.userName = String(sessionStorage.getItem("userName"));

  }

  public findAllMyPets() {
    this.apiService.sortMyPets(this.userId, this.sort).subscribe(
      res=>{
        this.pets = res;
      },
      err=> {
        alert("An error occurred")
      }
    )
  }

  onSelectChange(event: any) {
    this.sort = event.target.value;
    this.apiService.sortMyPets(this.userId, this.sort).subscribe(
      res=>{
        this.pets = res;
      },
      err=> {
        alert("An error occurred")
      }
    )
  }

  onLogOut() {
    sessionStorage.removeItem("userId");
    sessionStorage.removeItem("userName");
    this.router.navigate(['/']);
  }

  editPet(pet:any) {
    this.editService.pet = pet;
    this.router.navigate(['/editpet']);
  }

  deletePet(pet:any):void{
    if(window.confirm('Are sure you want to delete '+ pet.name +' ?')){
      this.apiService.deletePet(pet.id).subscribe(
        res => {
          location.reload()
        },
        err => {
          alert("An error occurred")
        }
      )
    }
  }
}
