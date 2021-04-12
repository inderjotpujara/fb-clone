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
  constructor(private postsService: PostsService, private router: Router, private userService: UsersService, private fb: FormBuilder,
    private facebookService: FacebookService,) {
  }

  ngOnInit(): void {
    this.getUser();
    this.retrievePosts();
    this.timenow = new Date().valueOf();
  }

<<<<<<< HEAD
  signUpForm = this.fb.group({
    firstName: [null, Validators.required],
    surName: [null, Validators.required],
    emailAddress: [null, Validators.required],
    newPassword: [null, Validators.required],

    gender: [null, Validators.required],
    imgUrl: [null, Validators.required],
  });

  public friendslist = [
    { id: 1, name: 'Vaishak Chandra',src:'https://picsum.photos/id/237/200/200' },
    { id: 2, name: 'Shashank Yadav',src:'https://picsum.photos/id/37/200/200'  },
    { id: 3, name: 'Virat Kohli',src:'https://picsum.photos/id/23/200/200'  },
    { id: 4, name: 'Eoin Morgan',src:'https://picsum.photos/id/27/200/200'  },
    { id: 5, name: 'Vini Chimamia' ,src:'https://picsum.photos/id/17/200/200' },
    { id: 6, name: 'Karthik Hr',src:'https://picsum.photos/id/337/200/200' },
    { id: 7, name: 'Muthu Patil',src:'https://picsum.photos/id/237/200/200'  },
    { id: 8, name: 'Sadanand Roy',src:'https://picsum.photos/id/238/200/200'  },
    { id: 9, name: 'Hina Khan',src:'https://picsum.photos/id/247/200/200'  },
    { id: 10, name: 'Vijay Rai' ,src:'https://picsum.photos/id/323/200/200' },
    { id: 11, name: 'Aishwarya N',src:'https://picsum.photos/id/293/200/200' },
    { id: 12, name: 'Manjunath Aithal',src:'https://picsum.photos/id/223/200/200'  },
    { id: 13, name: 'Prashanth K',src:'https://picsum.photos/id/337/200/200'  },
    { id: 14, name: 'Dileep Gowda',src:'https://picsum.photos/id/23/200/200'  },
    { id: 15, name: 'Shree Vani' ,src:'https://picsum.photos/id/16/200/200' },
    { id: 16, name: 'chithra Rammoorthy',src:'https://picsum.photos/id/7/200/200' },
    { id: 17, name: 'Savan Savani',src:'https://picsum.photos/id/24/200/200'  },
    { id: 18, name: 'Kl Rahul',src:'https://picsum.photos/id/75/200/200'  },
    { id: 19, name: 'Inderjot Singh',src:'https://picsum.photos/id/9/200/200'  },
    { id: 20, name: 'Sagar Devanga' ,src:'https://picsum.photos/id/1/200/200' },
  ];
  
=======
>>>>>>> 875cb111c6bf223c7df6cae8eaba52c8c7bdc2cc
  savePost(): void {
    this.post.email = this.user.emailAddress;
    this.post.name = this.user.firstName;
    this.post.dp = this.user.imgUrl;
    this.post.text = this.textpost;
    this.post.postImg = this.url;
    this.post.time = new Date().valueOf();
    this.post.likes = 0;
    this.postsService.create(this.post).then(() => {
      console.log('Created new item successfully!');
    });
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

}
