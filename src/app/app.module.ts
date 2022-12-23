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
    AddPetComponent,
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
