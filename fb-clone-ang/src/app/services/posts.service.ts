import { PostComponent } from './../Components/post/post.component';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import Posts from '../models/posts';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  private dbPath = '/posts';

  postsref: AngularFireList<any> = null;

  constructor(private db: AngularFireDatabase) {
    this.postsref = db.list(this.dbPath);
  }

  getAll(): AngularFireList<any> {
    return this.postsref;
  }

  getPostByUserId(id){
    return this.db.database.ref('posts')

  }

  create(post): any {
    return this.postsref.push(post);
  }

  update(key: string, value: any): Promise<void> {
    return this.postsref.update(key, value);
  }

  delete(key: string): Promise<void> {
    return this.postsref.remove(key);
  }
}
