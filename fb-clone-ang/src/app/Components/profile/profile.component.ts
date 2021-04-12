import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { PostsService } from 'src/app/services/posts.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
<<<<<<< HEAD
  Router: any;
  isInfoEditing=false
  profileInfo=`Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid
  quam numquam inventore minima blanditiis earum repudiandae.`;
=======
  arr: any;
  mypost: Array<Object>;
>>>>>>> 875cb111c6bf223c7df6cae8eaba52c8c7bdc2cc

  constructor(private userService: UsersService, private postsService: PostsService) { }
  user: any;

  ngOnInit(): void {
    this.getUser();
    this.retrievePosts();
  }
  getUser() {
    this.user = JSON.parse(this.userService.getuser());
    console.log(this.user);
  }
  retrievePosts(): void {
    this.postsService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.arr = data;
      // console.log(this.arr);
    });
  }

  infoChanged(){
console.log(this.profileInfo);

  }

}
