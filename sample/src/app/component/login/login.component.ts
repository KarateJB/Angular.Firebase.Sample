import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { User } from '@firebase/auth-types';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    private isAuth = false;
    private user: User = null;

    constructor(private afAuth: AngularFireAuth) {
        
        this.afAuth.authState.subscribe(
            user => this.changeState(user),
            error => console.trace(error)
        );

    }

    ngOnInit() {

    }

    private login(provider: string) {
        let afProvider = this.getProvider(provider);
        this.afAuth.auth.signInWithPopup(afProvider);
      }

      logout() {
        this.afAuth.auth.signOut();
      }
      
    private changeState(user: any = null) {
        console.log(JSON.stringify(user));
        if (user) {
            this.isAuth = true;
            // this.user = this.getUserInfo(user);
            this.user = user;
        }
        else {
            this.isAuth = false;
            this.user = null;
        }
    }

    private getUserInfo(user: any): any {
        if (!user) {
            return {};
        }
        console.info(user);

        let data = user.auth.providerData[0];
        return {
            name: data.displayName,
            avatar: data.photoURL,
            email: data.email,
            provider: data.providerId
        };
    }

    private getProvider(provider: string) {
        switch (provider) {
            case 'twitter': new firebase.auth.TwitterAuthProvider();
            case 'facebook': new firebase.auth.FacebookAuthProvider();
            case 'github': return new firebase.auth.GithubAuthProvider();
            case 'google': return new firebase.auth.GoogleAuthProvider();
        }
    }
}
