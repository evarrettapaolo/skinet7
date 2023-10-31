import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

//Actual route endpoints, client-side, lazy loading applied
const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'shop', loadChildren: () => import('./shop/shop.module').then(m => m.ShopModule)},
  {path: '**', redirectTo:'', pathMatch: 'full'}, //Not found url, strictly redirected to home URL -> ''
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
