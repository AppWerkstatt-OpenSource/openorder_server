import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';

import{Benutzer} from './benutzer/app.benutzer.component';
import{Tische} from './tische/app.tische.component';
import{Produkte} from './produkte/app.produkte.component';
import {HttpClientModule} from '@angular/common/http';

const AppRoutesConfig: Routes = [
    {
        path: 'benutzer',
        component: Benutzer
    },
    {
        path: 'tische',
        component: Tische 
    },
    {
        path: 'produkte',
        component: Produkte
    }
];

@NgModule({
  declarations: [
    AppComponent,
    Benutzer,
    Tische,
    Produkte
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(
      AppRoutesConfig,
      { enableTracing: true } // <-- debugging purposes only
    ),
    HttpClientModule
  ],
  providers: [
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
