import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  Router: any;
  isInfoEditing=false
  profileInfo=`Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid
  quam numquam inventore minima blanditiis earum repudiandae.`;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  infoChanged(){
console.log(this.profileInfo);

  }

}
