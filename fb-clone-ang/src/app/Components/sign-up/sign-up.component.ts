import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,Validators} from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  public subCategoryModel: any;
  signUpForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    surName: new FormControl(''),
    emailAddress: new FormControl(''),
    newPassword: new FormControl(''),
    day: new FormControl(''),
    month: new FormControl(''),
    year: new FormControl(''),
    dateOfBirth: new FormControl(''),
    gender: new FormControl(''),
  });
  public customData = [
    { id: 1, categoryName: 'She: "Wish her a happy birthday!"' },
    { id: 2, categoryName: 'He: "Wish him a happy birthday!"' },
    { id: 3, categoryName: 'They: "Wish them a happy birthday!"' },
  ];
  get firstName() {
    return this.signUpForm.get('firstName');
  }
}
