import { HomeComponent } from './Components/home/home.component';
import { NavigationEnd, NavigationStart, Router ,Event, ActivatedRoute} from '@angular/router';
import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Facebook';
  showHead: boolean = false;
  // route
  // constructor(private router: Router){
  //   this.router.events.pipe(
  //     filter(event => event instanceof NavigationEnd)
  //   ).subscribe((event: NavigationEnd) => {
  //     let currentRoute = this.route;
  //     let currentRoute = this.route;
  //     while (currentRoute.firstChild) currentRoute = currentRoute.firstChild;
  //     if (this.componentBeforeNavigation !== currentRoute.component) {
  //       if (window) window.scrollTo(0, 0);
  //     }
  //     this.componentBeforeNavigation = currentRoute.component;
  //   });
  // }

  ngOnInit() {
  }
  constructor(private Router:Router){
  Router.events.forEach((event) => {
    if (event instanceof NavigationStart) {
      console.log(event)
      if (event['url'] == '/login') {
        this.showHead = false;
      } else {
        // console.log("NU")
        this.showHead = true;
      }
    }
  });
}


}

