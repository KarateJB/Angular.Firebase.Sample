import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';

//Firebase
import { AngularFireModule } from 'angularfire2';
import { FirebaseConfig } from './class/FirebaseConfig';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

//3rd packages
import { ToastModule } from 'ng2-toastr/ng2-toastr';

import { AppComponent } from './app.component';
import { LoginComponent } from './component/login/login.component';
import { FbService } from './service/fb.service';
import { ToastOptions } from 'ng2-toastr/src/toast-options';
import { ToastConfig } from './class/toastr.config';


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
    ToastModule.forRoot(),
    AppRoutingModule
  ],
  providers: [
    { provide: ToastOptions, useClass: ToastConfig },
    FbService,

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
