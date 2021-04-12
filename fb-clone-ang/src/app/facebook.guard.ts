import { FacebookService } from 'src/app/facebook.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree ,Router} from '@angular/router';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class FacebookGuard implements CanActivate {
  constructor(private router:Router, private FacebookService: FacebookService){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  //  const user=localStorage.getItem("user");
  //   if(user!==null && user!==undefined) {
  //     return true;
  //   }
  //   else {
  //     return false;
  //   }

  if(this.FacebookService.isUserAvailable()){
    return true;
  }
  else{
    return this.router.parseUrl("login");
  }
    }
  }
