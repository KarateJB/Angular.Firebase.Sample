import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule  } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';

//Firebase
import { AngularFireModule } from 'angularfire2';
import { FirebaseConfig } from './class/FirebaseConfig';
// import { FirebaseConfigComponent } from './firebase-config/firebase-config.component';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';


import { AppComponent } from './app.component';
import { LoginComponent } from './component/component/login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    // FirebaseConfigComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(((new FirebaseConfig).config)),
    AngularFireDatabaseModule,
    AngularFireAuthModule,        
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
