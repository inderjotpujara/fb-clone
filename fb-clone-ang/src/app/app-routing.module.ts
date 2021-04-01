import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FbGuard } from './fb.guard';
import { LoginComponent } from './login/login/login.component';
import { SignUpComponent } from "./sign-up/sign-up.component";

const routes: Routes = [
  {
    path:'',
    loadChildren:() => import('./login/login.module').then(m => m.LoginModule),
    canActivate:[FbGuard]
  },{
    path:'login',
    component:LoginComponent
  },
  {
    path:"sign-up",
    component:SignUpComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
