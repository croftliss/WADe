import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './shared-guards/auth.guard';
import { CryptoCurrencyComponent } from './nav/crypto-currency/crypto-currency.component';
import { CryptoDetailsComponent } from './nav/crypto-currency/crypto-details/crypto-details.component';
import { HomeComponent } from './nav/home/home.component';
import { NgModule } from '@angular/core';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProfileComponent } from './nav/profile/profile.component';
import { SparqlComponent } from './nav/sparql/sparql.component';
import { VisualizationOfDataComponent } from './nav/vizualisation-of-data/vizualisation-of-data.component';
import { WalletComponent } from './nav/wallet/wallet.component';

const routes: Routes = [
  { path: 'cryk/wallet', component: WalletComponent, canActivate : [AuthGuard] },
  { path: 'cryk/profile', component: ProfileComponent, canActivate : [AuthGuard] },
  { path: 'cryk/cryptocurrencies', component: CryptoCurrencyComponent, canActivate : [AuthGuard] },
  { path: 'cryk/sparql', component: SparqlComponent, canActivate : [AuthGuard] },
  { path: 'cryk/visualization-of-data', component: VisualizationOfDataComponent, canActivate : [AuthGuard] },
  { path: 'cryk/crypto-details/:name', component: CryptoDetailsComponent, canActivate : [AuthGuard] },
  { path: 'cryk', component: HomeComponent, canActivate : [AuthGuard] },
  { path: '**', component: PageNotFoundComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
}
