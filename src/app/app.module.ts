import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { ShellComponent } from './shell/shell.component';
import { NavComponent } from './nav/nav.component';

import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import {ListboxModule} from 'primeng/listbox';
import { SingleProductComponent } from './single-product/single-product.component';

const PrimgeNgModules = [InputTextModule, ProgressSpinnerModule, ListboxModule];
@NgModule({
  declarations: [AppComponent, ShellComponent, NavComponent, SingleProductComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    PrimgeNgModules,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
