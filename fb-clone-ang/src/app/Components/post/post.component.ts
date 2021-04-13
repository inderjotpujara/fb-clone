import { Component, OnInit, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { PostsService } from 'src/app/services/posts.service';
import Posts from 'src/app/models/posts';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  @Input() item;
  @Output() newItemEvent = new EventEmitter<any>();
  loaderActive = true;
  likedByCurrentUser = false;
  constructor(private postsService: PostsService) {

  }
  arr: any;
  flag = true;
  ngOnInit(): void {
    // this.retrievePosts();
    console.log('init');

  }

  ngDoCheck(): void {
    //Called every time that the input properties of a component or a directive are checked. Use it to extend change detection by performing a custom check.
    //Add 'implements DoCheck' to the class.

  }

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.

    if (changes.item.currentValue) {
      console.log(changes.item.currentValue)
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
    this.likedByCurrentUser = !this.likedByCurrentUser
    console.log(this.likedByCurrentUser);

    this.likedByCurrentUser ? this.item.likes++ : this.item.likes--;
    console.log(this.item.likes);

    this.newItemEvent.emit(this.item);
    return
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    console.log('destroyed');

  }
}
