import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { AllPetsComponent } from './all-pets/all-pets.component';
import { AddPetComponent } from './add-pet/add-pet.component';
import {Router, RouterModule, Routes} from "@angular/router";
import { NotFoundComponent } from './not-found/not-found.component';
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {EditPetComponent} from "./edit-pet/edit-pet.component";
import {MyPetsComponent} from "./my-pets/my-pets.component";

const appRoutes:Routes=[
  {
    path:'addpet',
    component:AddPetComponent
  },
  {
    path:'allpets',
    component:AllPetsComponent
  },
  {
    path:'mypets',
    component:MyPetsComponent
  },
  {
    path:'editpet',
    component:EditPetComponent
  },
  {
    path:'',
    component:AllPetsComponent,
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
    NavigationComponent,
    AllPetsComponent,
    MyPetsComponent,
    AddPetComponent,
    EditPetComponent,
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
