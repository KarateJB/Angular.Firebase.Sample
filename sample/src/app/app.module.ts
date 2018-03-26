import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { environment } from '../environments/environment';

//Firebase
import { AngularFireModule } from 'angularfire2';
import { FirebaseConfig } from './class/FirebaseConfig';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireStorageModule } from 'angularfire2/storage';

//3rd packages
import { ToastModule } from 'ng2-toastr/ng2-toastr';

import { AppComponent } from './app.component';
import { LoginComponent } from './component/login/login.component';
import { FbService } from './service/fb.service';
import { ToastOptions } from 'ng2-toastr/src/toast-options';
import { ToastConfig } from './class/toastr.config';
import { ProdIndexComponent } from './component/prod-index/prod-index.component';
import { ProdBookComponent } from './component/prod-book/prod-book.component';
import { ProdToyComponent } from './component/prod-toy/prod-toy.component';
import { ProdBookingComponent } from './component/prod-booking/prod-booking.component';
import { ShopcartComponent } from './component/shopcart/shopcart.component';
import { ProdCreateComponent } from './component/prod-create/prod-create.component';
import { ProdEditComponent } from './component/prod-edit/prod-edit.component';
import { BlockUIService } from './service/blockUI.service';
import { BlockUIComponent } from './component/block-ui/blockUI.component';

//ngrx
import { shopcartReducer } from './ngrx/shopcart.action';
import { orderReducer } from './ngrx/order.action';
import { orderEffects } from './ngrx/order.effects';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule} from '@ngrx/store-devtools';
import { OrderService } from './service/order.service';
import { ProductService } from './service/product.service';
import { IStore } from './interface/IStore';
import { OrderComponent } from './component/order/order.component';
import { DropFileDirective } from './directive/drop-file.directive';
import { FileUploadComponent } from './component/file-upload/file-upload.component';

// declare module '@ngrx/store' {
//   interface Action {
//     type: string;
//     payload?: any;
//   }
// }

let reducers: IStore = {
    shopcart: shopcartReducer,
    order: orderReducer
}

@NgModule({
  declarations: [
    AppComponent,
    BlockUIComponent,
    LoginComponent,
    ProdIndexComponent,
    ProdBookComponent,
    ProdToyComponent,
    ProdBookingComponent,
    ShopcartComponent,
    ProdCreateComponent,
    ProdEditComponent,
    OrderComponent,
    DropFileDirective,
    FileUploadComponent,
  ],
  entryComponents: [
    BlockUIComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(((new FirebaseConfig).config)),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    ToastModule.forRoot(),
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([orderEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 10, // Retains last 25 states
      logOnly: environment.production // Restrict extension to log-only mode
    }),
    AppRoutingModule
  ],
  providers: [
    { provide: ToastOptions, useClass: ToastConfig },
    BlockUIService,
    FbService,
    OrderService,
    ProductService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
