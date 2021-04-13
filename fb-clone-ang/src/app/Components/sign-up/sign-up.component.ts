
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { FacebookGuard } from 'src/app/facebook.guard';
import { LoginComponent } from '../login/login.component';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import Users from 'src/app/models/user';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
  providers: [LoginComponent, FacebookGuard]
})
export class SignUpComponent implements OnInit {
  @ViewChild('signupModal') signUpModalRef;
  arr1: any;
  status = true;
  status1 = true;
  constructor(private comp: LoginComponent,
    private router: Router, private fb: FormBuilder, private userService: UsersService) { }
  ngOnInit(): void {
    //this.getDays();
    this.signUpForm.controls['day'].setValue(this.currentDay)
    this.getYears();
    this.getCurrentMonthName();
    this.getNumberOfDays();
    this.retrievePosts();
    this.status = false;

  }
  public days: any[] = [];
  public years: any[] = [];
  public selectionDay: any;
  public selectionMonth: any;
  public selectionYear: any;
  public currentYear = (new Date()).getFullYear();
  public currentDay = (new Date()).getDate();
  public currentMonth = (new Date()).getMonth() + 1;
  public currentMonthName: any;
  male = "Male";
  female = "Female";
  public months: any[] = [
    {
      monthId: 1,
      monthName: 'Jan',
    },
    {
      monthId: 2,
      monthName: 'Feb',
    },
    {
      monthId: 3,
      monthName: 'Mar',
    },
    {
      monthId: 4,
      monthName: 'Apr',
    },
    {
      monthId: 5,
      monthName: 'May',
    },
    {
      monthId: 6,
      monthName: 'Jun',
    },
    {
      monthId: 7,
      monthName: 'Jul',
    },
    {
      monthId: 8,
      monthName: 'Aug',
    },
    {
      monthId: 9,
      monthName: 'Sep',
    },
    {
      monthId: 10,
      monthName: 'Oct',
    },
    {
      monthId: 11,
      monthName: 'Nov',
    },
    {
      monthId: 12,
      monthName: 'Dec',
    }];

  signUpForm = this.fb.group({
    firstName: [null, Validators.required],
    surName: [null, Validators.required],
    emailAddress: ['', [
      Validators.required,
      Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}'),
    ]],
    newPassword: [null, Validators.required],
    day: [this.currentDay, Validators.required],
    month: [this.currentMonth, Validators.required],
    year: [this.currentYear, Validators.required],
    gender: [null, Validators.required],
    imgUrl: ['https://i.stack.imgur.com/l60Hf.png', Validators.required],
  });
  get firstName() {
    return this.signUpForm.get('firstName');
  }
  get surName() {
    return this.signUpForm.get('surName');
  }
  get emailAddress() {
    return this.signUpForm.get('emailAddress');
  }
  get newPassword() {
    return this.signUpForm.get('newPassword');
  }
  get gender() {
    return this.signUpForm.get('gender');
  }
  get year() {
    return this.signUpForm.get('year');
  }
  getDays() {
    for (let i = 1; i <= 31; i++) {
      this.days.push(i);
    }
  }
  getYears() {
    for (let i = this.currentYear; i >= 1905; i--) {
      this.years.push(i);
    }
  }
  getCurrentMonthName() {
    let monthData = this.months.filter((m) => m.monthId == this.currentMonth);
    this.currentMonthName = monthData[0].monthName;
  }
  onSignUp() {

    try {
      this.arr1.forEach((ele) => {
        if (this.signUpForm.value.emailAddress == ele.emailAddress) {
          alert("email exist");
          this.status1 = false;
        }
      });
    } catch (error) {
      console.log(error);
    }
    if (this.signUpForm.valid && this.status1) {

      this.saveUser();
      localStorage.setItem("user", this.signUpForm.value.emailAddress);
      localStorage.setItem("pass", this.signUpForm.value.newPassword);
      this.userService.setuser(this.signUpForm.value);
      //this.router.navigate(['home']);
      this.router.navigate(['home'])
        .then(() => {
          window.location.reload();
        });
    } else {
      this.validateAllFields(this.signUpForm)
    }
  }
  validateAllFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((field) => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFields(control);
      }
    });
  }
  getNumberOfDays() {
    let Month = this.signUpForm.value.month;
    let Year = this.signUpForm.value.year
    //console.log(this.signUpForm.value.month)
    this.days = [];
    let month = Month;
    let year = Year
    let noOfDays = new Date(year, month, 0).getDate();
    for (let i = 1; i <= noOfDays; i++) {
      this.days.push(i);
    }
  }

  saveUser(): void {
    let userInfo = this.signUpForm.value
    userInfo.userInfo = 'Hi this is preset user info. You can edit it anytime'
    this.userService.create(this.signUpForm.value).then(() => {
      console.log('Created new user successfully!');
    });
  }

  retrievePosts(): void {
    this.userService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.arr1 = data;
    });
  }
}
