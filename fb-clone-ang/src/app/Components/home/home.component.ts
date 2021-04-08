import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { PostsService } from 'src/app/services/posts.service';
import { UsersService } from 'src/app/services/users.service';
import Posts from 'src/app/models/posts';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  post: Posts = new Posts();
  arr: any;
  user: any;
  constructor(private postsService: PostsService, private router: Router, private userService: UsersService, private fb: FormBuilder) {
    this.getUser();
  }

  ngOnInit(): void {
    this.getUser();
  }

  signUpForm = this.fb.group({
    firstName: [null, Validators.required],
    surName: [null, Validators.required],
    emailAddress: [null, Validators.required],
    newPassword: [null, Validators.required],

    gender: [null, Validators.required],
    imgUrl: [null, Validators.required],
  });

  savePost(): void {
    this.postsService.create(this.post).then(() => {
      console.log('Created new item successfully!');
    });
  }


  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('pass');
    localStorage.removeItem('userinfo');
    this.router.navigate(['login']);
  }
  getUser() {
    this.user = JSON.parse(this.userService.getuser());
    console.log(this.user);
  }
  url: any = '';
  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      reader.onload = (event) => { // called once readAsDataURL is completed
        this.url = event.target.result;
        console.log(this.url)
      }
    }
  }
}
