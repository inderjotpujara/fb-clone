import { FacebookGuard } from 'src/app/facebook.guard';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from '../environments/environment';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignUpComponent } from './Components/sign-up/sign-up.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './Components/login/login.component';
import { HomeComponent } from './Components/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PostComponent } from './Components/post/post.component';
import { ProfileComponent } from './Components/profile/profile.component';
import { HeaderComponent } from './Components/header/header.component';


@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    LoginComponent,
    HomeComponent,
    PostComponent,
    ProfileComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
   
  ],
  providers: [{ provide: FacebookGuard, useClass: FacebookGuard }],
  bootstrap: [AppComponent]
})
export class AppModule { }
