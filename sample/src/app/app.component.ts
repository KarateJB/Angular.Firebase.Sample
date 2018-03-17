import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Location } from '@angular/common';
import { FirebaseService } from '@firebase/app-types/private';
import { FbService } from './service/fb.service';

declare var swal: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('slideInOut', [
      state('in', style({
        transform: 'translate3d(0, 0, 0)'
      })),
      state('out', style({
        transform: 'translate3d(100%, 0, 0)'
      })),
      transition('in => out', animate('400ms ease-in-out')),
      transition('out => in', animate('400ms ease-in-out'))
      //transition('* => *', animate('400ms ease-in-out')) //in<=>out
    ]),

    trigger('flyIn', [
      // state('void', style({ transform: 'translateX(-100%)' })),
      transition('void => *', [
        style({ transform: 'translateX(-100%)' }), //The void's style
        animate(900)
      ])
    ]),

    trigger('flyInOut', [
      state('in', style({ transform: 'translateX(-100%)' })),
      state('out', style({ transform: 'translateX(2000%)', opacity: 0 })),
      transition('void => *', [
        style({ transform: 'translateX(-100%)' }), //The void's style
        animate(700)
      ]),
      transition('* => out', animate(800))
    ])

  ]
})
export class AppComponent implements OnInit {

  public title: string = 'Angular X Firebase';
  public copyright: string = "JB";
  public menuState: string = "out";

  constructor(
    private location: Location,
    private fbService: FbService) {
  }

  ngOnInit() {

  }

  private toggleMenu() {
    this.menuState = (this.menuState === 'out' ? 'in' : 'out');
  }

  //Logout
  private logout() {
     this.fbService.logout();
  }

}
