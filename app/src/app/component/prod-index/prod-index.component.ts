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

  private goToCreate() {
    this.router.navigate(['Product/Create']);
  }

  private goToProduct(type: string) {
    switch (type.toLowerCase()) {
      case 'book':
        this.router.navigate(['Product/Index', 'Books']);
        break;
      case 'toy':
        this.router.navigate(['Product/Index', 'Toys']);
        break;
      default:
        this.router.navigate(['Product/Index']);      
        break;
    }
  }

  private goToToys() {
  }

  private goToShopcart() {
    this.router.navigate(['Product/Shopcart']);
  }



}
