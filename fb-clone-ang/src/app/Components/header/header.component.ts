import { FacebookService } from 'src/app/facebook.service';
import { HomeComponent } from './../home/home.component';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  FacebookService: any;


  constructor(private router: Router
  ) {

   }

  ngOnInit(): void {
  }

  goToProfile(){
    this.router.navigateByUrl('/profile')
  }
  goToHome(){
    this.router.navigateByUrl('/home')
  }
}
