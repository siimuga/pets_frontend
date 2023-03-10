import {Component, OnInit} from '@angular/core';
import {AllPets} from "./module/all-pets";
import {ApiService} from "../shared/api.service";
import {Router} from "@angular/router";
import {EditService} from "../shared/edit.service";

@Component({
  selector: 'app-all-pets',
  templateUrl: './all-pets.component.html',
  styleUrls: ['./all-pets.component.css']
})
export class AllPetsComponent implements OnInit{
  pets: AllPets[]=[]
  sort:string='nameAsc'

  constructor(private apiService:ApiService,
              private editService: EditService,
              private router: Router) {
  }

  ngOnInit() {
    this.findAllPets();
    sessionStorage.setItem("userId", String(2));
  }

  public findAllPets() {
    this.apiService.sortAllPets(this.sort).subscribe(
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
    this.router.navigate(['/']);
  }

  editPet(pet:any) {
    this.editService.pet = pet;
    this.router.navigate(['/editpet']);
  }

  onSelectChange(event: any) {
    this.sort = event.target.value;
    this.apiService.sortAllPets(this.sort).subscribe(
      res=>{
        this.pets = res;
      },
      err=> {
        alert("An error occurred")
      }
    )
  }


  deletePet(pet:any):void{
    if(window.confirm('Are sure you want to delete this item ?')){
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
