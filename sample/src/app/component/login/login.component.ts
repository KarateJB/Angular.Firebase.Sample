import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { User } from '@firebase/auth-types';
import { FbService } from '../../service/fb.service';
import { ProductService } from '../../service/product.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    constructor(private fbService: FbService, private prdService: ProductService) {
    }

    ngOnInit() {

    }    
    
    login(provider: string){
        this.fbService.login(provider);
    }

    logout(){
        this.fbService.logout();
    }

    
}
