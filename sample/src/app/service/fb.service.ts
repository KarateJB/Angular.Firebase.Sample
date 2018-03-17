import { AngularFireAuth } from 'angularfire2/auth';
import { Injectable } from '@angular/core';
import { User } from '@firebase/auth-types';

@Injectable()
export class FbService {
  
  public isAuth: boolean = false;
  public user: User = null;
  constructor(private afAuth: AngularFireAuth) {
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

}
