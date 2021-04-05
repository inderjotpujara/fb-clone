
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
    this.getDays();
    this.getYears();
    this.getCurrentMonthName();
  }
  public days: any[] = []; 
  public years: any[] = [];
  public selectionDay: any;
  public selectionMonth: any;
  public selectionYear:any;
  public currentYear=(new Date()).getFullYear();
  public currentDay=(new Date()).getDate();
  public currentMonth=(new Date()).getMonth()+1;
  public currentMonthName:any;
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
  signUpForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    surName: new FormControl(''),
    emailAddress: new FormControl(''),
    newPassword: new FormControl(''),
    day: new FormControl(''),
    month: new FormControl(''),
    year: new FormControl(''),
    gender: new FormControl(''),
  });
  get firstName() {
    return this.signUpForm.get('firstName');
  }
  getDays(){
    for (let i = 1; i <= 31; i++) {
      this.days.push(i);
    }
  }
  getYears(){
    for (let i = this.currentYear; i >=1905 ; i--) {
      this.years.push(i);
    }
  }
  getCurrentMonthName(){
    let monthData = this.months.filter((m) => m.monthId == this.currentMonth);
    this.currentMonthName=monthData[0].monthName;
  }
  onSignUp()
  {
    alert(JSON.stringify(this.signUpForm.value));
  }
}
