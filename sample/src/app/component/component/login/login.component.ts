import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private isAuth = false;
    private user = {};


    constructor(public afAuth: AngularFireAuth) {
        this.af.auth.subscribe(
            user => this.changeState(user),
            error => console.trace(error)
        );
    }

    ngOnInit() {

    }

    login() {
        this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
      }
      logout() {
        this.afAuth.auth.signOut();
      }
      
    //Login
    private login(provider: string) {
        this.af.auth.login({
            provider: this.getProvider(provider),
            method: AuthMethods.Popup
        });
    }

    //Logout
    private logout() {
        this.af.auth.logout();
    }

    private changeState(user: any = null) {
        if (user) {
            this.isAuth = true;
            this.user = this.getUserInfo(user)
        }
        else {
            this.isAuth = false;
            this.user = {};
        }
    }

    private getUserInfo(user: any): any {
        if (!user) {
            return {};
        }
        let data = user.auth.providerData[0];
        console.log(data);
        return {
            name: data.displayName,
            avatar: data.photoURL,
            email: data.email,
            provider: data.providerId
        };
    }

    private getProvider(provider: string) {
        switch (provider) {
            case 'twitter': return AuthProviders.Twitter;
            case 'facebook': return AuthProviders.Facebook;
            case 'github': return AuthProviders.Github;
            case 'google': return AuthProviders.Google;
        }
    }
}
