import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { MercadosComponent } from './pages/mercados/mercados.component';
import { MarketComponent } from './pages/market/market.component';
import { ContactComponent } from './pages/contact/contact.component';
import { SupportComponent } from './pages/support/support.component';
import { ManageProductsComponent } from './pages/admin/manage-products/manage-products.component';


const routes: Routes = [
  {
  path : '',
  component : HomeComponent,
  pathMatch : 'full'
  },
  {
    path : 'signup',
    component : SignupComponent,
    pathMatch : 'full'
  },
  {
    path : 'login',
    component : LoginComponent,
    pathMatch : 'full'
  },
  {
    path : 'markets',
    component : MercadosComponent,
    pathMatch : 'full'
  },
  {
    path : 'markets/:market',
    component : MarketComponent,
    pathMatch : 'full'
  },
  {
    path : 'contact',
    component : ContactComponent,
    pathMatch : 'full'
  },
  {
    path : 'support',
    component : SupportComponent,
    pathMatch : 'full'
  },
  {
    path : 'market/manage-products',
    component : ManageProductsComponent,
    pathMatch : 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
