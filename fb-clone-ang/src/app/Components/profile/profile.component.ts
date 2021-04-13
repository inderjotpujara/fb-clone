import { Router } from '@angular/router';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { PostsService } from 'src/app/services/posts.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  Router: any;
  isInfoEditing=false
  isWorks=false
  profileInfo:any;

  arr: any;
  mypost: Array<Object>;
  userRef: any;
  editInfo: any;
  workInfo = 'Trukker';


  constructor(private userService: UsersService, private postsService: PostsService, private cdRef: ChangeDetectorRef) { }
  user: any;
  posts:any=[];
  ngOnInit(): void {
    this.getUser();
    this.retrievePosts();
  }
  getUser() {
    this.user = JSON.parse(this.userService.getuser());

    console.log(this.user);
    this.profileInfo = this.user.userInfo
    this.workInfo=this.user.workInfo
    this.cdRef.detectChanges()
  }
  retrievePosts(): void {
    let postsref =this.postsService.getPostByUserId(this.user.key)
    postsref.orderByChild('createdBy').equalTo(this.user.key).on("value", (snapshot) => {
      console.log(snapshot.val());
      let tempPosts=[]
      snapshot.forEach((data)=> {
        // this.posts.push(data.val());
        tempPosts.push(data.val())
      })
      console.log(tempPosts);
      this.posts = [...tempPosts];
      this.cdRef.detectChanges()
  });
  }


  logPosts(){
    console.log(this.posts);

  }
  infoChanged(toChange, ref){
    console.log(this.profileInfo);
    // console.log('$key');
    this.userService.update(
      this.user.key,{userInfo:ref}
    ).then((val)=>{
        console.log(val)
  }).catch((err)=>{
      console.log(err);
    })

    // le editref=this.postsService.getPostByUserId(this.user.key)
    // editref.orderByChild('editProfile').equalTo(this.user.key).on("value",(snapshot)=>{
    //   console.log(snapshot.val);
    // })
  }

  workChanged(type, ref){
    console.log(this.workInfo);
    // console.log('$key');
    this.userService.update(
      this.user.key,{workInfo:ref}
    ).then((val)=>{
        console.log(val)
  }).catch((err)=>{
      console.log(err);
    })
  }

}
