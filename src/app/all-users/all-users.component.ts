import {Component, OnInit} from '@angular/core';
import {AllUsers} from "./module/all-users";
import {ApiService} from "../shared/api.service";
import {Router} from "@angular/router";
import {EditService} from "../shared/edit.service";

@Component({
  selector: 'app-all-pets',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css']
})
export class AllUsersComponent implements OnInit{
  users: AllUsers[]=[]

  constructor(private apiService:ApiService,
              private editService: EditService,
              private router: Router) {
  }

  ngOnInit() {
    this.findAllUsers();
  }

  public findAllUsers() {
    this.apiService.findAllUsers().subscribe(
      res=>{
        this.users = res;
      },
      err=> {
        alert(err.error.detail)
      }
    )
  }

  onLogOut() {
    sessionStorage.removeItem("userId");
    this.router.navigate(['/']);
  }
}
