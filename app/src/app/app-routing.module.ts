import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { ProdIndexComponent } from './component/prod-index/prod-index.component';
import { ProdBookComponent } from './component/prod-book/prod-book.component';
import { ProdToyComponent } from './component/prod-toy/prod-toy.component';
import { ShopcartComponent } from './component/shopcart/shopcart.component';
import { ProdCreateComponent } from './component/prod-create/prod-create.component';
import { ProdEditComponent } from './component/prod-edit/prod-edit.component';
import { OrderComponent } from './component/order/order.component';

const routes: Routes = [
  {path:'Login', component: LoginComponent},
  {
    path: 'Product/Index', component: ProdIndexComponent,
    children: [
      { path: 'Books', component: ProdBookComponent },
      { path: 'Toys', component: ProdToyComponent }
    ]
  },
  { path: 'Product/Shopcart', component: ShopcartComponent },
  { path: 'Product/Create', component: ProdCreateComponent },
  { path: 'Product/Edit/:id', component: ProdEditComponent },
  { path: 'Orders', component: OrderComponent },
  {path:'', redirectTo: 'login', pathMatch: 'full'}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
