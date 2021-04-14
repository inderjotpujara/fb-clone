import { UsersService } from './../../services/users.service';
import { Component, OnInit, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { PostsService } from 'src/app/services/posts.service';
import Posts from 'src/app/models/posts';
import * as moment from 'moment';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  @Input() item;
  @Output() newItemEvent = new EventEmitter<any>();
  @Output() newItemEvent2 = new EventEmitter<any>();

  loaderActive = true;
  likedByCurrentUser = false;
  likedIndex
  // userLiked = [];
  constructor(private postsService: PostsService, private usersService: UsersService) {

  }
  arr: any;
  flag = true;
  user;
  ngOnInit(): void {
    // this.retrievePosts();
    // console.log('init');
    this.user = JSON.parse(this.usersService.getuser())
    this.likedIndex = this.item.userLiked.findIndex((id) => {
      return id == this.user.key
    })
    if (this.likedIndex != -1) {
      this.likedByCurrentUser = true
    }
  }

  ngDoCheck(): void {
    //Called every time that the input properties of a component or a directive are checked. Use it to extend change detection by performing a custom check.
    //Add 'implements DoCheck' to the class.

  }

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.

    if (changes.item.currentValue) {
      // console.log(changes.item.currentValue)
      this.loaderActive = false //TODO

    }

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

  likeUpdate() {
    this.likedByCurrentUser = !this.likedByCurrentUser;
    let obj = {
      item: this.item.key,
      flag: this.likedByCurrentUser,
      userliked: this.item.userLiked
    }
    this.likedByCurrentUser ? this.item.likes++ : this.item.likes--;
    console.log(obj);
    this.newItemEvent.emit(this.item);
    this.newItemEvent2.emit(obj);

    return
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    // console.log('destroyed');

  }
  momentCall(date: string) {
    return moment(date).fromNow();
  }
}
