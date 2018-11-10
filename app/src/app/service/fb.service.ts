import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { User } from '@firebase/auth-types';


@Injectable()
export class FbService {

  public isAuth: boolean = false;
  public user: User = null;
  constructor(private afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe(
      user => this._changeState(user),
      error => console.trace(error)
    );
  }

  public login(provider: string) {
    let afProvider = this._getProvider(provider);
    this.afAuth.auth.signInWithPopup(afProvider);
  }


  public logout() {
    this.afAuth.auth.signOut();
    this.isAuth = false;
  }

  private _getUserInfo() {
    this.afAuth.authState.subscribe(
      user => this._changeState(user = user),
      error => console.trace(error)
    );
  }

  private _changeState(user: any = null) {
    // console.log(JSON.stringify(user));
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

  private _getProvider(provider: string) {
    switch (provider) {
      case 'twitter': new firebase.auth.TwitterAuthProvider();
      case 'facebook': new firebase.auth.FacebookAuthProvider();
      case 'github': return new firebase.auth.GithubAuthProvider();
      case 'google': return new firebase.auth.GoogleAuthProvider();
    }
  }

}
