import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FacebookGuard } from './facebook.guard';
import { LoginComponent } from './Components/login/login.component';
import { SignUpComponent } from "./Components/sign-up/sign-up.component";
import { HomeComponent } from './Components/home/home.component';
import { PostComponent } from './Components/post/post.component';
import { ProfileComponent } from './Components/profile/profile.component';
import { HeaderComponent } from './Components/header/header.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
    data:{header:false}
  },
  {
    path: "sign-up",
    component: SignUpComponent,
    canActivate: [FacebookGuard]
  },
  {
    path: "home",
    component: HomeComponent,
    canActivate: [FacebookGuard],
    data:{header:true}
  },
  {
    path: "post",
    component: PostComponent,
    canActivate: [FacebookGuard]
  },
  {
    path: "profile",
    component: ProfileComponent,
    canActivate: [FacebookGuard]
  },
  {
    path: "header",
    component: HeaderComponent,
    canActivate: [FacebookGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
