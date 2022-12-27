import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AllPetsComponent } from './all-pets/all-pets.component';
import { AddPetComponent } from './add-pet/add-pet.component';
import {RouterModule, Routes} from "@angular/router";
import { NotFoundComponent } from './not-found/not-found.component';
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {EditPetComponent} from "./edit-pet/edit-pet.component";
import {MyPetsComponent} from "./my-pets/my-pets.component";
import {LoginCreateComponent} from "./login-create/login-create.component";
import {AllUsersComponent} from "./all-users/all-users.component";

const appRoutes:Routes=[
  {
    path:'addpet',
    component:AddPetComponent
  },
  {
    path:'admin',
    component:AllPetsComponent
  },
  {
    path:'admin/users',
    component:AllUsersComponent
  },
  {
    path:'mypets',
    component:MyPetsComponent
  },
  {
    path:'login',
    component:LoginCreateComponent
  },
  {
    path:'editpet',
    component:EditPetComponent
  },
  {
    path:'',
    component:LoginCreateComponent,
    pathMatch:'full'
  },
  {
    path:'**',
    component:NotFoundComponent
  }
]

@NgModule({
  declarations: [
    AppComponent,
    AllPetsComponent,
    AllUsersComponent,
    MyPetsComponent,
    AddPetComponent,
    EditPetComponent,
    LoginCreateComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
