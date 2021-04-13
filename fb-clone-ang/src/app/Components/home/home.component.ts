import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { PostsService } from 'src/app/services/posts.service';
import { UsersService } from 'src/app/services/users.service';
import Posts from 'src/app/models/posts';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { FacebookService } from 'src/app/facebook.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  static path(): string {
    throw new Error('Method not implemented.');
  }
  url: any = '';
  textpost: string;
  timenow: number;
  arr: any;
  post: Posts = new Posts();
  user: any;
  userLiked = [];

  constructor(private postsService: PostsService, private router: Router, private userService: UsersService, private fb: FormBuilder,
    private facebookService: FacebookService,) {
  }

  ngOnInit(): void {
    this.getUser();
    this.retrievePosts();
    this.timenow = new Date().valueOf();
  }

  savePost(): void {
    this.post.email = this.user.emailAddress;
    this.post.name = this.user.firstName;
    this.post.dp = this.user.imgUrl;
    this.post.text = this.textpost;
    this.post.postImg = this.url;
    this.post.time = new Date().toISOString();
    this.post.likes = 0;
    this.post.userLiked = [];
    this.postsService.create(this.post).then(() => {
      console.log('Created new item successfully!');
    });
    console.log(this.user);
    console.log(this.post);
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
    });
    console.log(this.arr);

  }

  toProfile() {
    this.router.navigate(['profile']);
  }

  // retrievePosts(): void {
  //   this.postsService.getAll().snapshotChanges().pipe(
  //     map(changes =>
  //       changes.map(c =>
  //         ({ key: c.payload.key, ...c.payload.val() })
  //       )
  //     )
  //   ).subscribe(data => {
  //     this.arr = data;
  //   });
  // }
  onClick() {
    alert("Work in progress")
  }

  showWIPAlert() {
    alert("Work in progress")
  }

  fileData: File = null;
  previewUrl: any = null;
  fileProgress(fileInput: any) {
    this.fileData = <File>fileInput.target.files[0];
    this.preview();
  }

  preview() {
    // Show preview
    var mimeType = this.fileData.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(this.fileData);
    reader.onload = (_event) => {
      this.previewUrl = reader.result;
      this.url = this.previewUrl;
    }
    console.log(this.url);
  }
  toArray(n) {
    return new Array(n)
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
  updateLikesDb(newItem: any) {

    this.postsService.update(
      newItem.key, { likes: newItem.likes }).then((val) => {
      }).catch((err) => {
        console.log(err);
      })

  }


  checkChanges(index, item) {
    return item.key
  }
  goToProfile() {
    this.router.navigateByUrl('/profile')
  }
  updadateLikesArrayDb2(newItem2: any) {
    console.log(newItem2.userliked);
    console.log(newItem2.flag);

    if (!newItem2.userliked) {
      newItem2.userliked = []
    }
    if (newItem2.flag) {
      newItem2.userliked.push(this.user.key);
    } else {
      newItem2.userliked.forEach((ele, idx) => {
        if (ele === this.user.key) {
          console.log("deleting");

          newItem2.userliked.splice(idx, 1);
        }
      });
    }

    this.postsService.update(
      newItem2.item, { userLiked: newItem2.userliked }).then((val) => {
      }).catch((err) => {
        console.log(err);
      })
    console.log(newItem2.userliked);
  }
}
