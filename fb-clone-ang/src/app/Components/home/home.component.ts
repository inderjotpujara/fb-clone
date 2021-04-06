import { Component, OnInit } from '@angular/core';
import { PostsService } from 'src/app/services/posts.service';
import Posts from 'src/app/models/posts';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
url:any='';
onSelectFile(event) {
  if (event.target.files && event.target.files[0]) {
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]); // read file as data url
    reader.onload = (event) => { // called once readAsDataURL is completed
      this.url = event.target.result;
    }
  }
}
  post: Posts = new Posts();
  arr: any;
  constructor(private postsService: PostsService) { }
  ngOnInit(): void {
    this.retrievePosts();
  }
  savePost(): void {
    this.postsService.create(this.post).then(() => {
      console.log('Created new item successfully!');
    });
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
  }
}