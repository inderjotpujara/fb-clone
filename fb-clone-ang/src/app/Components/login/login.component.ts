import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { map } from 'rxjs/operators';
import { summaryFileName } from '@angular/compiler/src/aot/util';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  status = true;
  username: string;
  password: string;
  userslist: any;
  userinfo: Object;
  constructor(private router: Router, private userService: UsersService) { }

  ngOnInit(): void {
    this.retrieveUsers();
    this.status = false;
  }

  login(form: NgForm): void {
    try {
      this.userslist.forEach((ele) => {
        if (this.username == ele.emailAddress && this.password == ele.newPassword) {
          localStorage.setItem("user", ele.emailAddress);
          this.userinfo = ele;
          this.userService.setuser(ele);
          this.status = true;
        }
      });
    } catch (error) {
      console.log(error);
    }
    if (this.status) {
      this.router.navigate(['home']);
    } else {
      alert('Login failed,Please enter the valid credentials');
    }
  }


  retrieveUsers(): void {
    this.userService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.userslist = data;
    });
  }

}
