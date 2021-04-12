import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FacebookService {

  constructor() { }

 
  isLoggedIn() {
    if (this.isUserAvailable()) {
      return true;
    }
    return false;
  }

  isUserAvailable() {
    const user = localStorage.getItem('user');
    if (user !== null && user !== undefined) return true;
    return false;
  }
}
