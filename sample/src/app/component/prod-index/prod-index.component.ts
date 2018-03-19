import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-prod-index-component',
  templateUrl: './prod-index.component.html',
  styleUrls: ['./prod-index.component.css']
})
export class ProdIndexComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

   private goToCreate(){
     this.router.navigate(['Product/Create']);
   }

  private goToBooks() {
    this.router.navigate(['Product/Index', 'Books']);
  }

  private goToToys() {
    this.router.navigate(['Product/Index', 'Toys']);
  }

  private goToShopcart() {
    this.router.navigate(['Product/Shopcart']);
  }



}
