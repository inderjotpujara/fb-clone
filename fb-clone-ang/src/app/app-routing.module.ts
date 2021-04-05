import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FacebookGuard } from './facebook.guard';
import { LoginComponent } from './Components/login/login.component';
import { SignUpComponent } from "./Components/sign-up/sign-up.component";
import { HomeComponent } from './Components/home/home.component';


const routes: Routes = [
  {
    path:'',
    loadChildren:() => import('./Components/home/home.module').then(m => m.HomeModule),
    canActivate:[FacebookGuard]
  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:"sign-up",
    component:SignUpComponent,
    canActivate:[FacebookGuard]
  },
  {
    path:"home",
    component:HomeComponent,
    canActivate:[FacebookGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
