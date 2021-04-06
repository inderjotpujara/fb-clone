
import { Component, OnInit, ViewChild } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { FacebookGuard } from 'src/app/facebook.guard';
import { LoginComponent } from '../login/login.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
  providers: [LoginComponent, FacebookGuard]
})
export class SignUpComponent implements OnInit {
  @ViewChild('signupModal') signUpModalRef;
  constructor(private comp: LoginComponent,
    private router: Router, private fb: FormBuilder) { }


  ngOnInit(): void {
    this.getYears();
    this.getCurrentMonthName();
    this.getNumberOfDays();
  }
  public days: any[] = [];
  public years: any[] = [];
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
    emailAddress: [null, Validators.required],
    newPassword: [null, Validators.required],
    day: [this.currentDay, Validators.required],
    month: [this.currentMonth, Validators.required],
    year: [this.currentYear, Validators.required],
    gender: [null, Validators.required],
    imgUrl: [null],
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
    if(this.signUpForm.valid){
    alert(JSON.stringify(this.signUpForm.value));
    }else{
      this.validateAllFields(this.signUpForm)
    }
  }
  closeSignUp() {
    //this.router.navigate(['\login'])
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
    let Month=this.signUpForm.value.month;
    let Year=this.signUpForm.value.year
    this.days=[];
    let month = Month;
    let year = Year
    let noOfDays = new Date(year, month, 0).getDate();
    for (let i = 1; i <= noOfDays; i++) {
      this.days.push(i);
    }
  }
}

