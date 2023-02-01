import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CryptoCurrencyComponent } from './crypto-currency/crypto-currency.component';
import { CryptoCurrencyService } from './crypto-currency/crypto-currency.service';
import { CryptoDetailsComponent } from './crypto-currency/crypto-details/crypto-details.component';
import { CryptoDetailsService } from './crypto-currency/crypto-details/crypto-details.service';
import { HomeComponent } from './home/home.component';
import { HomeService } from './home/home.service';
import { LayoutModule } from '@angular/cdk/layout';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { NavComponent } from './nav.component';
import { NavService } from './nav.service';
import { NgMaterialModule } from '../ng-material/ng-material.module';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ProfileComponent } from './profile/profile.component';
import { ProfileService } from './profile/profile.service';
import { RouterModule } from '@angular/router';
import { SparqlComponent } from './sparql/sparql.component';
import { SparqlService } from './sparql/sparql.service';
import { VisualizationOfDataComponent } from './vizualisation-of-data/vizualisation-of-data.component';
import { VodService } from './vizualisation-of-data/vod.service';
import { WalletComponent } from './wallet/wallet.component';
import { WalletService } from './wallet/wallet.service';

@NgModule({
  declarations: [
    WalletComponent,
    CryptoCurrencyComponent,
    ProfileComponent,
    VisualizationOfDataComponent,
    NavComponent,
    SparqlComponent,
    CryptoDetailsComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    LayoutModule,
    FormsModule,
    ReactiveFormsModule,
    NgMaterialModule,
    RouterModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    NgxChartsModule
  ],
  providers: [NavService, VodService, HomeService, WalletService, ProfileService, CryptoCurrencyService, SparqlService, CryptoDetailsService],
  exports: [ NavComponent ], 
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class NavModule { }
