import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import Users from '../models/user';


@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private dbPath = '/users';

  userref: AngularFireList<any> = null;
  constructor(private db1: AngularFireDatabase) {
    this.userref = db1.list(this.dbPath);
  }

  getAll(): AngularFireList<any> {
    return this.userref;
  }
  setuser(userd) {
    localStorage.setItem("userinfo", JSON.stringify(userd));
  }
  getuser() {
    return localStorage.getItem("userinfo")
  }
  create(user): any {
    return this.userref.push(user);
  }

  update(key: string, value: any): Promise<void> {
    return this.userref.update(key, value);
  }

  refreshUser(){

    return this.db1.database.ref('users')
  }

  delete(key: string): Promise<void> {
    return this.userref.remove(key);
  }
}
