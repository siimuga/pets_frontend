import {Component, OnInit} from '@angular/core';
import {ApiService} from "../shared/api.service";
import {Router} from "@angular/router";
import {Login} from "./module/login";
import {Create} from "./module/create";

@Component({
  selector: 'app-login-create',
  templateUrl: './login-create.component.html',
  styleUrls: ['./login-create.component.css']
})
export class LoginCreateComponent implements OnInit{
  login: Login = {
    username: '',
    password: ''
  };
  create:Create={
    username: '',
    password: ''
  }

  constructor(private apiService:ApiService,
              private router: Router) {
  }

  ngOnInit() {
    sessionStorage.removeItem("userId");
  }

  goMyPets(){
    this.router.navigate(['/mypets']);
  }
  goAdmin(){
    this.router.navigate(['/admin']);
  }

  onLogIn(): void {
    this.apiService.onLogIn(this.login).subscribe(
      res => {
        sessionStorage.setItem("userId", String(res));
        sessionStorage.setItem("userName", this.login.username);
        if (res > 1) {
          this.goMyPets();
        } else if (res == 1) {
          this.goAdmin();
        }
      },
      err => {
        alert(err.error.detail)
      }
    )
  }


  onCreate(): void {
    this.apiService.onCreate(this.create).subscribe(
      res => {
        alert("New pet owner created!")
        location.reload()
      },
      err => {
        alert(err.error.detail)
      }
    )
  }
}
