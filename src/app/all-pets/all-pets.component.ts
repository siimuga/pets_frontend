import {Component, OnInit} from '@angular/core';
import {AllPets} from "./module/all-pets";
import {ApiService} from "../shared/api.service";
import {Router} from "@angular/router";
import {EditService} from "../shared/edit.service";
import {PetId} from "./module/pet-id";

@Component({
  selector: 'app-all-pets',
  templateUrl: './all-pets.component.html',
  styleUrls: ['./all-pets.component.css']
})
export class AllPetsComponent implements OnInit{
  pets: AllPets[]=[]
  selectedPet: PetId = {
    id: 0
  };

  constructor(private apiService:ApiService,
              private editService: EditService,
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
    this.editService.pet = pet;
    this.router.navigate(['/editpet']);
  }

  deletePet(pet:any):void{
    if(window.confirm('Are sure you want to delete this item ?')){
      this.selectedPet.id=pet.id
      this.apiService.deletePet(this.selectedPet).subscribe(
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
